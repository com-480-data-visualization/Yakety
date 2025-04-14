export function renderProductionTrends(data) {

  const cleanData = data.map(d => ({
    product: (d.product || d.crop || "").toString().trim().toLowerCase(),
    country_code: (d.country_code || d.country || "").toString(),
    value: +d.value || 0,
    year: +d.year || (d.season ? +d.season.split("-")[0] : 1970) 
  })).filter(d => 
    d.product && 
    d.country_code && 
    !isNaN(d.value) && 
    !isNaN(d.year)
  );

  data.forEach(d => {
    d.value = +d.value;
    d.year = +d.year;
  });
  
  
    return validItems;
  }

  const products = [...new Set(cleanData.map(d => d.product))];
  const years = [...new Set(cleanData.map(d => d.year))].sort((a,b) => a-b);
  
  let currentProduct = products.includes("cereal") ? "cereal" : products[0];
  let currentYear = years[years.length - 1]; 

  const productSelect = d3.select("#product-select")
    .html("") 
    .on("change", function() {
      currentProduct = this.value;
      update();
    });

  productSelect.selectAll("option")
    .data(products)
    .enter()
    .append("option")
    .text(d => d.charAt(0).toUpperCase() + d.slice(1))
    .attr("value", d => d)
    .property("selected", d => d === currentProduct);

  const yearSlider = d3.select("#year-slider")
    .attr("min", years[0])
    .attr("max", years[years.length - 1])
    .attr("value", currentYear)
    .on("input", function() {
      currentYear = +this.value;
      d3.select("#year-display").text(currentYear);
      update();
    });

  d3.select("#year-display").text(currentYear);

  update();


  function update() {

    const filtered = cleanData.filter(d => 
      d.product === currentProduct && 
      d.year <= currentYear
    );

    if (filtered.length === 0) {
      showError(`无 ${currentProduct} 在 ${currentYear} 年前的数据`);
      return;
    }

    const top10 = [...filtered]
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    renderBars(top10);
    renderTimeline(filtered);
  }

  function renderBars(data) {
    const container = d3.select("#country-bars").html("");

    const maxValue = d3.max(data, d => d.value) || 1;


    data.forEach((d, i) => {
      const row = container.append("div")
        .style("display", "grid")
        .style("grid-template-columns", "120px 1fr 80px")
        .style("margin-bottom", "5px");

      row.append("div")
        .text(getCountryName(d.country_code))
        .style("padding", "3px 10px");

      row.append("div")
        .style("background", "#f0f0f0")
        .append("div")
        .style("width", `${(d.value / maxValue * 100)}%`)
        .style("height", "20px")
        .style("background", "#4CAF50");

      row.append("div")
        .text(d.value >= 1000000 
          ? `${(d.value/1000000).toFixed(1)}M` 
          : `${d.value}`)
        .style("text-align", "right")
        .style("padding", "3px 10px");
    });
  }

  function renderTimeline(data) {
    const years = [...new Set(data.map(d => d.year))].sort();
    const svg = d3.select("#timeline").html("")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "50");

    const x = d3.scaleLinear()
      .domain([years[0], years[years.length - 1]])
      .range([30, svg.node().getBoundingClientRect().width - 30]);

    svg.append("line")
      .attr("x1", x.range()[0])
      .attr("x2", x.range()[1])
      .attr("y1", 25)
      .attr("y2", 25)
      .attr("stroke", "#ddd");

    svg.selectAll(".tick")
      .data(years)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${x(d)},25)`)
      .call(g => {
        g.append("line")
          .attr("y1", 0)
          .attr("y2", d => d === currentYear ? 10 : 5)
          .attr("stroke", d => d === currentYear ? "#e10801" : "#999");
        g.append("text")
          .attr("y", 20)
          .attr("text-anchor", "middle")
          .style("font-size", "10px")
          .style("font-weight", d => d === currentYear ? "bold" : "normal")
          .text(d => d);
      });
  }

  function showError(msg) {
    d3.select("#country-bars").html(`
      <div class="error-message" style="
        color: #e10801;
        padding: 20px;
        text-align: center;
      ">${msg}</div>
    `);
    d3.select("#timeline").html("");
  }

if (typeof module !== 'undefined') {
  module.exports = { renderProductionTrends };
} else {
  window.renderProductionTrends = renderProductionTrends;
}