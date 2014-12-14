Quadrant Chat 象限圖模組 for D3.js
========

Demo
----

[Defult Page](http://goo.gl/iUlPpn)<br />  

1.[BCG Matrix](http://goo.gl/q1MsYp)<br />
2.[App Engagement](http://goo.gl/NHLWFq)<br />
3.[YOY Predictions](http://goo.gl/kY2YBq)<br />

[![image]](http://goo.gl/q1MsYp)
[image]: http://goo.gl/Gt5ZVU "bcg_matrix"


[HTML]
####
		<div id="graph" style="width: 800px; height: 600px;"></div>
		// id : "graph" (unmodifiable)

[Script]
####

		<script>
		url_data_source = "quadrant_default.csv" //(required)
		// .. Setting Variable
		// .. Setting Parameter

		d3_quadrant(); //(last line)
  		</script>

[Default Variable]
####

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

[Default Parameter]
####

		visible_grid_line = true // grid line visible
		visible_grid_desc = true // desc visible
		visible_quadrant_line = true // split line to 4 quadrant
		visible_watermarking = true // watermarking visible
		visible_item_text = true // is show circle item text
		visible_axis = true // is show circle item text 

		svg_margin = 50;
		svg_margin_left = 60;

