<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Interactive JH Baxter Complaints Chart</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            margin: 20px;
            background-color: #f9f9f9;
        }

        .chart-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 900px;
            margin: 0 auto;
        }

        .tooltip {
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-size: 12px;
            pointer-events: none;
            display: none;
            z-index: 1000;
        }

        .chart-title {
            font-weight: bold;
            margin-bottom: 10px;
        }

        .chart-subtitle {
            color: #666;
            margin-bottom: 20px;
        }

        .listening-rect {
            fill: none;
            pointer-events: all;
        }

        .grid-line {
            stroke: #e0e0e0;
            stroke-width: 0.5;
        }

        .axis-text {
            fill: #777;
            font-size: 12px;
        }

        .axis-label {
            fill: #777;
            font-size: 14px;
            font-family: Arial, Helvetica, sans-serif;
        }

        .data-line {
            fill: none;
            stroke: #2563eb;
            stroke-width: 2;
        }

        .hover-circle {
            fill: #2563eb;
            stroke: white;
            stroke-width: 2;
            opacity: 0.8;
        }

        .source-credit {
            font-size: 10px;
            fill: #999;
        }
    </style>
</head>
<body>
    <div class="chart-container">
        <div id="chart"></div>
    </div>

    <script>

// If you're using a CSV instead of the array below, replace this array
// with: d3.csv("complaints_8.11.csv").then(data => { ...draw chart... })
const complaintsData = [
  {year: 1977, complaints: 1},
  {year: 1978, complaints: 1},
  {year: 1979, complaints: 1},
  {year: 1980, complaints: 3},
  {year: 1982, complaints: 2},
  {year: 1984, complaints: 1},
  {year: 1985, complaints: 1},
  {year: 1986, complaints: 2},
  {year: 1987, complaints: 12},
  {year: 1988, complaints: 5},
  {year: 1989, complaints: 3},
  {year: 1990, complaints: 2},
  {year: 1991, complaints: 8},
  {year: 1992, complaints: 11},
  {year: 1993, complaints: 9},
  {year: 1994, complaints: 28},
  {year: 1995, complaints: 14},
  {year: 1996, complaints: 6},
  {year: 1997, complaints: 27},
  {year: 1998, complaints: 12},
  {year: 1999, complaints: 13},
  {year: 2000, complaints: 15},
  {year: 2001, complaints: 21},
  {year: 2002, complaints: 73},
  {year: 2003, complaints: 437},
  {year: 2004, complaints: 762},
  {year: 2005, complaints: 657},
  {year: 2006, complaints: 221},
  {year: 2007, complaints: 104},
  {year: 2008, complaints: 62},
  {year: 2009, complaints: 113},
  {year: 2010, complaints: 79},
  {year: 2011, complaints: 50},
  {year: 2012, complaints: 65},
  {year: 2013, complaints: 94},
  {year: 2014, complaints: 45},
  {year: 2015, complaints: 16},
  {year: 2016, complaints: 11},
  {year: 2017, complaints: 29},
  {year: 2018, complaints: 13},
  {year: 2019, complaints: 128},
  {year: 2020, complaints: 47},
  {year: 2021, complaints: 108},
  {year: 2022, complaints: 14}
];

// Select ai2html container
const container = d3.select("#g-complaints-full");
const containerNode = container.node();
const fullWidth = containerNode.getBoundingClientRect().width;
const fullHeight = containerNode.getBoundingClientRect().height;

const margin = { top: 80, right: 40, bottom: 60, left: 80 };
const width = fullWidth - margin.left - margin.right;
const height = fullHeight - margin.top - margin.bottom;

// Append SVG
const svg = container.append("svg")
  .attr("width", fullWidth)
  .attr("height", fullHeight)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Tooltip
const tooltip = d3.select("body").append("div").attr("class", "tooltip");

// Scales
const xScale = d3.scaleLinear()
  .domain(d3.extent(complaintsData, d => d.year))
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(complaintsData, d => d.complaints)])
  .range([height, 0]);

// Line
const line = d3.line()
  .x(d => xScale(d.year))
  .y(d => yScale(d.complaints))
  .curve(d3.curveMonotoneX);

// Gridlines
svg.selectAll(".grid-line-horizontal")
  .data(yScale.ticks(5))
  .enter().append("line")
  .attr("class", "grid-line")
  .attr("x1", 0)
  .attr("x2", width)
  .attr("y1", d => yScale(d))
  .attr("y2", d => yScale(d));

svg.selectAll(".grid-line-vertical")
  .data(xScale.ticks(8))
  .enter().append("line")
  .attr("class", "grid-line")
  .attr("x1", d => xScale(d))
  .attr("x2", d => xScale(d))
  .attr("y1", 0)
  .attr("y2", height);

// Axes
svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale).tickFormat(d3.format("d")).tickSize(0).tickPadding(10))
  .call(g => g.select(".domain").remove());

svg.append("g")
  .call(d3.axisLeft(yScale).tickSize(0).tickPadding(10))
  .call(g => g.select(".domain").remove());

// Axis labels
svg.append("text")
  .attr("class", "axis-label")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 20)
  .attr("x", -(height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Number of complaints");

svg.append("text")
  .attr("class", "axis-label")
  .attr("transform", `translate(${width / 2}, ${height + 40})`)
  .style("text-anchor", "middle")
  .text("Date of the complaint");

// Data line
svg.append("path")
  .datum(complaintsData)
  .attr("class", "data-line")
  .attr("d", line);

// Hover circle
const hoverCircle = svg.append("circle")
  .attr("class", "hover-circle")
  .attr("r", 0)
  .style("pointer-events", "none");

// Hover interaction
svg.append("rect")
  .attr("class", "listening-rect")
  .attr("width", width)
  .attr("height", height)
  .on("mousemove", function(event) {
    const [mouseX] = d3.pointer(event, this);
    const bisectYear = d3.bisector(d => d.year).left;
    const year = xScale.invert(mouseX);
    const index = bisectYear(complaintsData, year, 1);
    const d0 = complaintsData[index - 1];
    const d1 = complaintsData[index];
    if (!d0 && !d1) return;
    const d = !d1 ? d0 : !d0 ? d1 :
      (year - d0.year > d1.year - year ? d1 : d0);
    hoverCircle
      .attr("cx", xScale(d.year))
      .attr("cy", yScale(d.complaints))
      .attr("r", 6);
    tooltip
      .style("display", "block")
      .style("left", (event.pageX + 15) + "px")
      .style("top", (event.pageY - 15) + "px")
      .html(`<strong>Year:</strong> ${d.year}<br><strong>Complaints:</strong> ${d.complaints}`);
  })
  .on("mouseleave", function() {
    hoverCircle.attr("r", 0);
    tooltip.style("display", "none");
  });

// Titles
svg.append("text")
  .attr("class", "chart-title")
  .attr("x", 0)
  .attr("y", -50)
  .style("font-size", "20px")
  .style("font-weight", "bold")
  .text("JH Baxter odor sparked over 3300 complaints in the last 45 years");

svg.append("text")
  .attr("class", "chart-subtitle")
  .attr("x", 0)
  .attr("y", -30)
  .style("font-size", "14px")
  .style("fill", "#666")
  .text("The number of complaints per year since the first complaint in 1977.");

</script>

</body>
</html>
