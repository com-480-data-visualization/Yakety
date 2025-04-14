// dataload
Promise.all([
    d3.csv("data/sample.csv"),
    d3.json("data/regions.json")
]).then(([csvData, geoData]) => {
    console.log("数据加载完成:", { csvData, geoData });
    // initialization graph
});

d3.json("data/countries-110m.json").then(data => {
    console.log("数据加载成功", data);
  }).catch(error => {
    console.error("数据加载失败:", error);
  });
  