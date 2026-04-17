<script setup>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

const chart1 = ref(null)
const chart2 = ref(null)
const songsData = ref([])

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:3000/api/songs")
    songsData.value = await response.json()
    drawCharts()
  } catch (e) {
    console.error("Failed to fetch stats", e)
  }
})

function drawCharts() {
  if (!songsData.value.length) return

  const margin = { top: 20, right: 30, bottom: 40, left: 180 }
  const width = 600 - margin.left - margin.right
  const height = 500 - margin.top - margin.bottom

  const createBarChart = (containerRef, metricAccessor, xAxisLabel, color) => {
    containerRef.innerHTML = ''

    const svg = d3.select(containerRef)
      .append("svg")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr("width", "100%")
      .attr("height", "100%")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    const maxVal = Math.ceil(d3.max(songsData.value, metricAccessor) || 1)

    const x = d3.scaleLinear()
      .domain([0, maxVal])
      .range([0, width])

    const tickCount = Math.min(maxVal, 10)

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(tickCount).tickFormat(d3.format("d")))
      .selectAll("text")
      .attr("fill", "#e5e7eb") 
      .attr("font-size", "12px")

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 15)
      .attr("fill", "#e5e7eb")
      .text(xAxisLabel)

    const y = d3.scaleBand()
      .range([0, height])
      .domain(songsData.value.map(d => d.title))
      .padding(.2)

    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("fill", "#e5e7eb")
      .attr("font-size", "12px")

    svg.selectAll("myRect")
      .data(songsData.value)
      .enter()
      .append("rect")
      .attr("x", x(0) )
      .attr("y", d => y(d.title) )
      .attr("width", d => x(metricAccessor(d)) )
      .attr("height", y.bandwidth() )
      .attr("fill", color)
      .attr("rx", 4)
  }

  createBarChart(
    chart1.value, 
    d => d.play_count || 0, 
    "Total Play Count", 
    "#42b883" 
  )

  createBarChart(
    chart2.value, 
    d => (d.listen_duration && d.listen_duration.average) ? d.listen_duration.average : 0, 
    "Average Listen Duration (seconds)", 
    "#aa3bff" 
  )
}
</script>

<template>
  <div class="stats-container" style="padding: 2rem;">
    <h1 style="margin-bottom: 2rem;">Listening Metrics</h1>
    
    <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 400px; background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px;">
        <h2 style="text-align: center; margin-bottom: 1rem;">Play Count per Song</h2>
        <div ref="chart1"></div>
      </div>
      
      <div style="flex: 1; min-width: 400px; background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px;">
        <h2 style="text-align: center; margin-bottom: 1rem;">Average Listen Duration</h2>
        <div ref="chart2"></div>
      </div>
    </div>
  </div>
</template>