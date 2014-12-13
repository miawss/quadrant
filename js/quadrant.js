/**
 * Reusable Quadrant Chart for D3.js
 * Created by Russell Shih on 2014/12/12
 */

 // Default Variable
x_grid = 10;
y_grid = 10;

x_desc = 'X desc';
y_desc = 'Y desc';

x_label=['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'],
y_label=['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'],

watermarking_RT = "Q1";
watermarking_LT = "Q2";
watermarking_LB = "Q3";
watermarking_RB = "Q4";

watermarking_opacity = 0.2;
watermarking_fontsize = "36px";
item_fontsize = "90%";

// Default Parameter
visible_grid_line = true // grid line visible
visible_grid_desc = true // desc visible
visible_quadrant_line = true // split line to 4 quadrant
visible_watermarking = true // watermarking visible
visible_item_text = true // is show circle item text
visible_axis = true // is show circle item text 

svg_margin = 50;
svg_margin_left = 60;

function d3_quadrant() {

    // ------------  main --------------
    svg_width = parseInt(d3.select("#graph").style("width")) - svg_margin * 2;
    svg_height = parseInt(d3.select("#graph").style("height")) - svg_margin * 2;

    var svg = d3.select("#graph").append("svg")
        .attr("width", svg_width)
        .attr("height", svg_height);

    var x = d3.scale.linear().domain([-x_grid, x_grid]).range([svg_margin_left, svg_width - svg_margin]);
    var y = d3.scale.linear().domain([-y_grid, y_grid]).range([svg_height - svg_margin, svg_margin]);

    var quadrant_height=(svg_height - svg_margin * 2) / 2
    var quadrant_width=(svg_width - svg_margin - svg_margin_left) / 2


    //----------- add quadrant line  -------------//  
    if (visible_quadrant_line) {
        // Draw X-axis grid lines
        svg.selectAll("line.x")
            .data(x.ticks(1))
            .enter().append("line")
            .attr("class", "cross_x")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", svg_margin)
            .attr("y2", svg_height - svg_margin)
            .style("stroke", "#000")
            .style("opacity", 0.1)
            .style("stroke-width", "9px");

        // Draw Y-axis grid lines
        svg.selectAll("line.y")
            .data(y.ticks(1))
            .enter().append("line")
            .attr("class", "cross_y")
            .attr("x1", svg_margin_left)
            .attr("x2", svg_width - svg_margin)
            .attr("y1", y)
            .attr("y2", y)
            .style("stroke", "#000")
            .style("opacity", 0.1)
            .style("stroke-width", "9px");
    } // add cross line 

    //----------- add x,y description -------------//  
    if (visible_grid_desc) {
        svg.append("text")
            .attr("class", "x axis label")
            //.attr("text-anchor", "end")
            .attr("x", (svg_width - svg_margin - svg_margin_left) * 0.5 + svg_margin_left)
            .attr("y", svg_height - 5)
            .attr("text-anchor", "middle")
            .text("" + x_desc + "");

        svg.append("text")
            .attr("class", "y axis label")
            .attr("transform", "rotate(-90)")
            .attr("y", 10 - 0)
            .attr("x", 0 - (svg_height / 1.5))
            .attr("dy", "1em")
            .text("" + y_desc + "");
    } // add x,y description

    var axis = d3.svg.axis()

    .ticks(x_grid * 2)
        .tickFormat(function(d) {
            return x_label[d + x_grid]
        })
        .scale(x);

    var yaxis = d3.svg.axis()
        .orient('left')
        .ticks(y_grid * 2)
        .tickFormat(function(d) {
            return y_label[d + y_grid]
        })
        .scale(y);

    //----------- Draw axis label -------------//    
    if (visible_axis) {
        var xa = svg.append('g')
            .attr('transform', "translate(0, +" + (svg_height - svg_margin) + ")")
            .attr("class", "xaxis")
            .call(axis) 
            .selectAll("text");

        var ya = svg.append('g')
            .attr('transform', 'translate(' + svg_margin_left + ', 0)')
            .attr("class", "yaxis")
            .call(yaxis);
    } // Draw axis label

    d3.csv(url_data_source, function(data1) {

        //----------- Draw Grids Line -------------//      
        if (visible_grid_line) {
            svg.selectAll("line.x")
                .data(x.ticks(x_grid * 2))
                .enter().append("line")
                .attr("class", "x")
                .attr("x1", x)
                .attr("x2", x)
                .attr("y1", svg_margin)
                .attr("y2", svg_height - svg_margin)
                .style("stroke", "#ccc")
                .style("opacity", 0.5);

            svg.selectAll("line.y")
                .data(y.ticks(y_grid * 2))
                .enter().append("line")
                .attr("class", "y")
                .attr("x1", svg_margin_left)
                .attr("x2", svg_width - svg_margin)
                .attr("y1", y)
                .attr("y2", y)
                .style("stroke", "#000")
                .style("stroke", "#ccc")                
                .style("opacity", 0.5);
        } // Draw Grids

        //----------- watermarking -------------//
        if (visible_watermarking) {

            watermarking = svg.append("g")
                .attr("class", "watermarking");

            watermarking.append("text")
                .attr("x", x(-x_grid / 2))
                .attr("y", y(y_grid / 3))
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
                .style('opacity', watermarking_opacity)
                .style("font-size", watermarking_fontsize)
                .text(watermarking_LT);

            watermarking.append("text")
                .attr("x", x(x_grid / 2))
                .attr("y", y(y_grid / 3))
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
                .style('opacity', watermarking_opacity)
                .style("font-size", watermarking_fontsize)
                .text(watermarking_RT);

            watermarking.append("text")
                .attr("x", x(-x_grid / 2))
                .attr("y", y(-y_grid / 1.5))
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
                .style('opacity', watermarking_opacity)
                .style("font-size", watermarking_fontsize)
                .text(watermarking_LB);

            watermarking.append("text")
                .attr("x", x(x_grid / 2))
                .attr("y", y(-y_grid / 1.5))
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
                .style('opacity', watermarking_opacity)
                .style("font-size", watermarking_fontsize)
                .text(watermarking_RB);
        } // watermarking


        if (true) {
            var circle1 = svg.selectAll("g.circle1")
                .data(data1)
                .enter()
                .append("g")
                .attr("class", "circle1");

            //Add a dot
            circle1.append("circle")
                .data(data1)
                .style('fill', function(d) {
                    return d.color;
                })
                .attr("r", function(d) {
                    return d.value / 100000;
                })
                .style("stroke", function(d) {
                    return d.color;
                })
                .transition()
                .duration(1000)
                .attr("r", function(d) {
                    return d.value / 1;
                })
                .style('fill', function(d) {
                    return d.color;
                })
                .style('fill-opacity', 0.5)
                .style("stroke", function(d) {
                    return d.color;
                })
                .attr("cx", function(d) {
                    return x(d.x);
                })
                .attr("cy", function(d) {
                    return y(d.y);
                });

            if (visible_item_text) {
                circle1.append("text")
                    .attr("x", function(d) {
                        return x(d.x);
                    })
                    .attr("y", function(d) {
                        return y(d.y);
                    })
                    .attr("dy", "1.25em")
                    .attr("text-anchor", "middle")
                    .attr("pointer-events", "none")
                    .style("font-size", item_fontsize)
                    .style('fill', '#cc3333')
                    .text(function(d) {
                        return d.label;
                    });
            }
        } // add the circle1 and text

    });

}