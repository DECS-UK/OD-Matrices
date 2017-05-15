window.app = {};
var app = window.app;

app.WarningPane = function(opt_options) {

  var options = opt_options || {};

                //var button = document.createElement('button');

                var button = document.createElement("div");
                button.id = "warningBox"
                button.className = "warningInner_css"

                var element = document.createElement('div');
                element.className = 'warning_css ol-unselectable ol-control';
                element.appendChild(button);

                ol.control.Control.call(this, {
                  element: element,
                  target: options.target
                });

              };
              ol.inherits(app.WarningPane, ol.control.Control);


   



              app.showlayers = function(opt_options) {
                var options = opt_options || {};

                var control_element= document.createElement("div");

                control_element.id = "label_layer_control";
                control_element.className = "layer_control_css layer_on glyphicon glyphicon-font"

                var control_element2= document.createElement("div");

                control_element2.id = "heat_layer_control";
                control_element2.className = "layer_control_css layer_on glyphicon glyphicon-th"


                var element = document.createElement('div');
                element.className = 'layer_control_placement_css ol-unselectable ol-control';
                element.appendChild(control_element);
                element.appendChild(control_element2);

                ol.control.Control.call(this, {
                  element: element,
                  target: options.target
                });

              };
              ol.inherits(app.showlayers, ol.control.Control);




              app.RegionGranularityRadio = function(opt_options) {

                var options = opt_options || {};

                //var button = document.createElement('button');

                var button = document.createElement("div");
                button.class="row-fluid";
                button.setAttribute("data-toggle", "buttons")
                button_group = document.createElement("div");
                button_group.className = "btn-group";


                var btn = document.createElement("label");
                btn.className = "btn btn-primary-widget active";

                $('#unit_text_origin').text("Zonal Unit");
                $('#unit_text_dest').text("Zonal Unit");

                
                btn.innerHTML = "Zonal Units";
                btn.id = "layer_btn_uniform_grid"
                var input = document.createElement("input");
                input.type = "radio";
                input.name = "optionG2";
                input.id = "uniform_grid";
                btn.appendChild(input);

                var btn2 = document.createElement("label");
                btn2.className = "btn btn-primary-widget";
                btn2.innerHTML = "Wards";
                btn2.id = "layer_btn_wards"
                var input2 = document.createElement("input");
                input2.type = "radio";
                input2.name = "optionG2";
                input2.id = "wards";
                btn2.appendChild(input2);



                button_group.appendChild(btn);
                button_group.appendChild(btn2);

                button.appendChild(button_group);
                //button.innerHTML = 'N';

                var this_ = this;
                var handleWards = function() {
                  $('#unit_text_origin').text("Ward");
                  $('#unit_text_dest').text("Ward");

                  $('#dest_id_field').editable('option', 'title', 'Enter a ward identifier');
                  $('#origin_id_field').editable('option', 'title', 'Enter a ward identifier');

                  $("#layer_btn_wards").addClass("active");
                  $("#layer_btn_uniform_grid").removeClass("active");
                  global_store['origin'] = null;
                  global_store['dest'] = null;
                  interface_state['selection_granularity'] = 'ward';
                  update_selection_granularity();
                  reset_display();

                };
                var handleUniformGrid = function() {
                  $('#unit_text_origin').text("Zonal Unit");
                  $('#unit_text_dest').text("Zonal Unit");
                  $("#layer_btn_uniform_grid").addClass("active");
                  $("#layer_btn_wards").removeClass("active");

                  $('#dest_id_field').editable('option', 'title', 'Enter a zonal unit identifier');
                  $('#origin_id_field').editable('option', 'title', 'Enter a zonal unit identifier');

                  global_store['origin'] = null;
                  global_store['dest'] = null;
                  interface_state['selection_granularity'] = 'cell';
                  update_selection_granularity( );
                  reset_display();
                };

                input.addEventListener('change', handleUniformGrid, false);
                input2.addEventListener('change', handleWards, false);
                //button.addEventListener('touchstart', handleRotateNorth, false);

                var element = document.createElement('div');
                element.className = 'region_granularity_css ol-unselectable ol-control';
                element.appendChild(button);

                ol.control.Control.call(this, {
                  element: element,
                  target: options.target
                });

              };
              ol.inherits(app.RegionGranularityRadio, ol.control.Control);





              app.LayerRadio = function(opt_options) {

                var options = opt_options || {};

                //var button = document.createElement('button');

                var button = document.createElement("div");
                button.class="row-fluid";
                button.setAttribute("data-toggle", "buttons")
                button_group = document.createElement("div");
                button_group.className = "btn-group";


                var btn = document.createElement("label");
                btn.className = "btn btn-primary-widget";
                btn.innerHTML = "Routes ";
                btn.id = "layer_btn_route"
                var input = document.createElement("input");
                input.type = "radio";
                input.name = "optionG";
                input.id = "routes";
                btn.appendChild(input);

                var btn2 = document.createElement("label");
                btn2.className = "btn btn-primary-widget active";
                btn2.innerHTML = "Region ";
                btn2.id = "layer_btn_grid"
                var input2 = document.createElement("input");
                input2.type = "radio";
                input2.name = "optionG";
                input2.id = "grid";
                btn2.appendChild(input2);


                button_group.appendChild(btn2);
                button_group.appendChild(btn);


                button.appendChild(button_group);
                //button.innerHTML = 'N';

                var this_ = this;
                var handleRoutes = function() {

                  $("#layer_btn_route").addClass("active");
                  $("#layer_btn_grid").removeClass("active");
                  interface_state['display_type'] = 'route';
                  update_selection()
                    //alert('R');
                  };
                  var handleGrid = function() {

                    if( global_store['origin'] != null && global_store['dest'] != null ){
                      handleRoutes();
                      return;
                    }

                    $("#layer_btn_grid").addClass("active")
                    $("#layer_btn_route").removeClass("active")
                    interface_state['display_type'] = 'grid';
                    update_selection()
                    //alert('G');
                  };

                  input.addEventListener('click', handleRoutes, false);
                  input2.addEventListener('click', handleGrid, false);
                //button.addEventListener('touchstart', handleRotateNorth, false);

                var element = document.createElement('div');
                element.className = 'routes_vs_regions_css ol-unselectable ol-control';
                element.appendChild(button);

                ol.control.Control.call(this, {
                  element: element,
                  target: options.target
                });

              };
              ol.inherits(app.LayerRadio, ol.control.Control);



              app.MapControlLegend = function(opt_options) {

                var options = opt_options || {};

                //var button = document.createElement('button');

                var button = document.createElement("div");
                button.id = "boxMultibar"
                button.style = "width:400px;"


                var element = document.createElement('div');
                element.className = 'legend_css ol-unselectable ol-control';
                element.appendChild(button);

                ol.control.Control.call(this, {
                  element: element,
                  target: options.target
                });

              };
              ol.inherits(app.MapControlLegend, ol.control.Control);


              app.MapControlSave = function(opt_options) {

                var options = opt_options || {};

                //var button = document.createElement('button');

                var button = document.createElement("div");
                button.type = "button" ;
                button.id = "map_dl_btn";
                button.className = "btn btn-default glyphicon glyphicon-download-alt";
                button.title = "Download map (and legend if avaliable)";


                var this_ = this;
                var handleDownload = function() {
                  map.once('postcompose', function(event) {
                    var canvas = event.context.canvas;
                    canvas.toBlob(function(blob) {
                      saveAs(blob, 'map.png');
                    });
                  });
                  map.renderSync();
                  if( "legend" in global_store ) {
                    html2canvas($('#boxMultibar'), {
                      onrendered: function(canvas) {
                        canvas.toBlob(function(blob) { saveAs(blob, 'legend.png');  });
                      }
                    });
                  }

                };


                button.addEventListener('click', handleDownload, false);
                //button.addEventListener('touchstart', handleRotateNorth, false);

                var element = document.createElement('div');
                element.className = 'MapControlSave_css ol-unselectable ol-control';
                element.appendChild(button);

                ol.control.Control.call(this, {
                  element: element,
                  target: options.target
                });

              };
              ol.inherits(app.MapControlSave, ol.control.Control);


              app.ClickSelectRadio = function(opt_options) {

                var options = opt_options || {};

                var switch_div = document.createElement("div");
                switch_div.className = "switch";
                var input_line = document.createElement("input");
                input_line.id = "cmn-toggle-7";
                input_line.className = "cmn-toggle cmn-toggle-yes-no";
                input_line.type = "checkbox";
                var label_line = document.createElement("label");
                label_line.id = "origindest_switch";
                label_line.setAttribute("for", "cmn-toggle-7");
                label_line.setAttribute("data-on", "Selecting Origin");
                label_line.setAttribute("data-off","Selecting Destination")
                switch_div.appendChild(input_line);
                switch_div.appendChild(label_line);
                input_line.checked=true;

                

                var this_ = this;
                var handleSourceSelect = function() {
                    //loading_routes = true;
                    //update_selection()
                    interface_state['selecting_origin'] = !interface_state['selecting_origin'];
                    if( select.getFeatures().getLength() == 0) { update_selection(); }
                    //redo_title();
                    //alert('R');
                  };


                  input_line.addEventListener('change', handleSourceSelect, false);


                  var element = document.createElement('div');
                  element.className = 'origin_dest_switcher_css ol-unselectable ol-control';
                  element.appendChild(switch_div);

                  ol.control.Control.call(this, {
                    element: element,
                    target: options.target
                  });

                };
                ol.inherits(app.ClickSelectRadio, ol.control.Control);
