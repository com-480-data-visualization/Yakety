import { renderProductionTrends } from './productionTrends.js';

Promise.all([
    d3.json("data/countries-110m.json"),
    d3.csv("data/agriculture-production.csv", d => {
        return {
            product: d.product,         
            country_code: d.country_code,
            value: +d.value,
            year: +d.year              
        };
    })
]).then(([topology, agriData]) => {
    const agriDataMap = {};
    agriData.forEach(d => {
        agriDataMap[d.country_code] = d.value;
    });

    const countries = topojson.feature(topology, topology.objects.countries);
    
    countries.features.forEach(country => {
        country.properties.production = agriDataMap[country.id] || 0;
    });

    const svg = d3.select("#world-map")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 600);

    const projection = d3.geoNaturalEarth1()
        .fitSize([1000, 600], countries);

    const path = d3.geoPath().projection(projection);

    const colorScale = d3.scaleSequential(d3.interpolateGreens)
        .domain([0, d3.max(agriData, d => d.value)]);

    svg.selectAll(".country")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("class", "country")
        .attr("d", path)
        .attr("fill", d => colorScale(d.properties.production))
        .attr("stroke", "#fff")
        .on("mouseover", function(event, d) {
            d3.select(this).attr("stroke-width", 2);
            showTooltip(`${d.properties.name}: ${d.properties.production} tons`);
        })
        .on("mouseout", function() {
            d3.select(this).attr("stroke-width", 0.5);
            hideTooltip();
        });

    addLegend(colorScale);
    renderProductionTrends(agriData);
});

function showTooltip(text) {
    d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "white")
        .style("padding", "5px")
        .text(text);
}

function hideTooltip() {
    d3.select(".tooltip").remove();
}

function addLegend(colorScale) {
    const legend = d3.select("#world-map")
        .append("div")
        .attr("class", "legend");

    const legendWidth = 300;
    const legendHeight = 20;

    const legendSvg = legend.append("svg")
        .attr("width", legendWidth + 50)
        .attr("height", 50);

    const gradient = legendSvg.append("defs")
        .append("linearGradient")
        .attr("id", "legend-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

    gradient.selectAll("stop")
        .data(colorScale.ticks(5).map((t, i, n) => ({
            offset: `${100 * i / n.length}%`,
            color: colorScale(t)
        })))
        .enter().append("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);

    legendSvg.append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#legend-gradient)");

    const axisScale = d3.scaleLinear()
        .domain(colorScale.domain())
        .range([0, legendWidth]);

    const axis = d3.axisBottom(axisScale)
        .ticks(5)
        .tickFormat(d3.format(".2s"));

    legendSvg.append("g")
        .attr("transform", `translate(0, ${legendHeight})`)
        .call(axis);
}