/*!
 * jquery-multibar v0.4.0 by @teorossi
 * Copyright (c) 2015-2018 Matteo Rossi
 *
 * https://github.com/teorossi82/jquery-multi-bar
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Modified by Gavin Smith 2017.
 * Modification: createBar(...) plots colours sequentially and with equal width as given in the options rather weighting the colour widths linearly by their bounding values.
 * TODO: Allow these to co-exist as an option.
 */

function numberWithCommas(x) {
    //return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    x = Math.ceil(x);
    return x.toLocaleString('en',{maximumFractionDigits: 0})
}

function numberWithCommas_short(x) {
    x = Math.ceil(x);
    //return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if( x >= 1000 && x < 1000000) {
        return Math.floor(x/1000).toLocaleString('en',{maximumFractionDigits: 0}) + 'K'
    } else if (x >= 1000000) {
        return Math.floor(x/1000000).toLocaleString('en',{maximumFractionDigits: 0}) + 'M'
    }
    
    return x.toLocaleString('en',{maximumFractionDigits: 0})
}

(function ($) {

    var createBar = function(options){

        var mulBar = '<div class="multi-bar-box'
        if(options.reverse)
            mulBar += ' reverse ';
        mulBar+='" ';
        var shadow = options.shadow && shadow_type[options.shadow];
        if(shadow)
            mulBar+= ' style="' + shadow_type[options.shadow] + '"';
        mulBar+='>';

        // for(var b=0;b<options.multiBarValue.length;b++){
        //     var value = options.multiBarValue[b].val;
        //     var widthF = b==0 ? 'width:' + ((options.multiBarValue[b].val-options.min)/(options.max-options.min))*100 + '%':'width:' + ((options.multiBarValue[b].val-options.multiBarValue[b-1].val)/(options.max-options.min))*100 + '%';
        //     var width = 'width:' + (100.0/options.multiBarValue.length) + '%';
        //     var bg = options.multiBarValue[b].bgClass ? 'class="multi-bar-bar ' + options.multiBarValue[b].bgClass + '" style="' + width + '"':options.multiBarValue[b].bgColor ? 'class="multi-bar-bar" style="background-color:' + options.multiBarValue[b].bgColor + ';' + width + '"':'class="multi-bar-bar" style="' + width + '"';
        //     mulBar+='<div ' + bg + '></div>';
        // }

        for(var b=0;b<options.multiBarValue.length;b++){
            var value = numberWithCommas(options.multiBarValue[b].val);
            var width = 'width:' + (100.0/options.multiBarValue.length) + '%';
            var bg = options.multiBarValue[b].bgClass ? 'class="multi-bar-bar ' + options.multiBarValue[b].bgClass + '" style="' + width + '"':options.multiBarValue[b].bgColor ? 'class="multi-bar-bar" style="background-color: rgb(' + options.multiBarValue[b].bgColor[0] + ',' + options.multiBarValue[b].bgColor[1] + ',' + options.multiBarValue[b].bgColor[2] + ');' + width + '"':'class="multi-bar-bar" style="' + width + '"';
            mulBar+='<div ' + bg + '></div>';
        }



        mulBar+='</div>'
        var valBar = '<div class="multi-bar-value-content"><div class="multi-bar-initVal">' + numberWithCommas_short(options.min) + '</div>';
        valBar += '<div class="multi-bar-initVal" id ="invisible_div" style="color:rgba(0,0,0,0)">HELLO</div>'
        // Now we are going to write on the values under the bar
        // We have a number of options.
        // (1) less than 5 patches --> no internal numbering
        // (2) we have 5 or more and an odd number --> three internal
        // (3)

        for(var c=0;c<options.multiBarValue.length;c++){
            width_amount =  (100.0/options.multiBarValue.length);

                var visibility = options.multiBarValue[c].visibility ? options.multiBarValue[c].visibility : "visible";
                if( options.multiBarValue.length >= 20 && c % 5 == 0 ){
                    if( c == 0  ){
                        visibility = 'visible'
                        valBar+='<div class="multi-bar-value-box ' + visibility + '" style="width:' + (3*width_amount) + '%;"><div class="multi-bar-value">' + '&nbsp;' + '</div></div>';
                    } else if (c != options.multiBarValue.length-1 ) {
                        visibility = 'visible';

                        valBar+='<div class="multi-bar-value-box ' + visibility + '" style="width:' + (5*width_amount) + '%;"><div class="multi-bar-value">' + numberWithCommas_short(options.multiBarValue[c].val) + '</div></div>';



                    }

                }else{
                    visibility = 'hidden';
                }


        }
        valBar+='<div class="multi-bar-lastVal">' + numberWithCommas_short(options.max) + '</div></div>';

        return {mulBar:mulBar,valBar:valBar}
    }

    var createBar_hot = function(options){
        var mulBar = '<div class="multi-bar-box'
        if(options.reverse)
            mulBar += ' reverse ';
        if(options.size)
            mulBar += ' multi-bar-' + options.size + ' ';
        mulBar+=' ">';
        var indice = options.min;
        for(var b=0;b<colors.hot.length;b++){
            mulBar+='<div class="multi-bar-bar" style="background-color:' + colors.hot[b] + ';width:10%"></div>';
        }
        mulBar+='</div>'

        var valBar = '<div class="multi-bar-value-content"><div class="multi-bar-initVal">' + options.min + '</div>';
        if(options.reverse)
            valBar = '<div class="multi-bar-value-content reverse"><div class="multi-bar-initVal">' + options.min + '</div>';
        var indice = options.min;
        for(var c=0;c<colors.hot.length;c++){
            indice+=((options.max-options.min)/10)
            if(c==colors.hot.length-1)
                valBar+='<div class="multi-bar-value-box" style="width:10%"></div>';
            else
                valBar+='<div class="multi-bar-value-box" style="width:10%"><div class="multi-bar-value">' + indice.toFixed(1) + '</div></div>';
        }
        valBar+='<div class="multi-bar-lastVal">' + options.max + '</div></div>';

        return {mulBar:mulBar,valBar:valBar}
    }

    var createBar_cold = function(options){
        var mulBar = '<div class="multi-bar-box'
        if(options.reverse)
            mulBar += ' reverse ';
        if(options.size)
            mulBar += ' multi-bar-' + options.size + ' ';
        mulBar+=' ">';
        var indice = options.min;
        for(var b=0;b<colors.cold.length;b++){
            mulBar+='<div class="multi-bar-bar" style="background-color:' + colors.cold[b] + ';width:10%"></div>';
        }
        mulBar+='</div>'

        var valBar = '<div class="multi-bar-value-content"><div class="multi-bar-initVal">' + options.min + '</div>';
        if(options.reverse)
            valBar = '<div class="multi-bar-value-content reverse"><div class="multi-bar-initVal">' + options.min + '</div>';
        var indice = options.min;
        for(var c=0;c<colors.cold.length;c++){
            indice+=((options.max-options.min)/10)
            if(c==colors.cold.length-1)
                valBar+='<div class="multi-bar-value-box" style="width:10%"></div>';
            else
                valBar+='<div class="multi-bar-value-box" style="width:10%"><div class="multi-bar-value">' + indice.toFixed(1) + '</div></div>';
        }
        valBar+='<div class="multi-bar-lastVal">' + options.max + '</div></div>';

        return {mulBar:mulBar,valBar:valBar}
    }

    var createMarker = function(arValue,options){
        var marker = '<div class="multi-bar-marker-content';
        if(options.posMarker && options.posMarker==="inside")
            marker += ' inside ';
        var direction = "left";
        if(options.reverse){
            marker += ' reverse ';
            direction = "right"
        }
        marker+='">'
        var icon = 'arrow-down';
        if(options.iconMarker)
            icon = options.iconMarker;
        for(var i=0;i<arValue.length;i++){
            var value;
            var color;
            var objValue = arValue[i] && typeof arValue[i]=='object';
            if(objValue){
                value=numberWithCommas( arValue[i].value );
                color=arValue[i].color;
            }
            else{
                value=arValue[i];
                color="black";
            }

            // find the colour band index that the number will appear
            var bin_containing_val = 0
            for(; bin_containing_val < options.boundaries.length-2; bin_containing_val++ ){
                if( value <= options.boundaries[bin_containing_val+1] ){
                    break;
                }
            }
            //console.info('Value was: ' + value + 'Colour bin was: ' + bin_containing_val);
            // get the width of the legend, in pixels
            var legend_width =$('#boxMultibar').width();

            

            // determine the width of the last label, i.e. the longest a label can be, in pixels
//            var max_val_txt_width = $($('#boxMultibar').find(".multi-bar-lastVal")[0]).width();
//            var min_val_txt_width = $($('#boxMultibar').find(".multi-bar-minVal")[0]).width();


            var str_val = numberWithCommas(value);
            $('#invisible_div').text(str_val);
            var txt_width =$('#invisible_div').width();
            $('#invisible_div').empty();
            

            // we are going to use a left alignment here in css and manually compute a middle.
            // this makes it easier for fixing the edge cases

            // we will compute point on the legend (in relative pixels) that should be the center point of the label
            var bin_width_in_pixels = legend_width / options.multiBarValue.length;
            var center_markerPosition = bin_width_in_pixels*bin_containing_val + 0.5*bin_width_in_pixels;

           

            //have now have three cases.
            // (1) the marker runs off the right end
            // (2) the marker runs off the left end
            // (3) the marker is fine
            var buffer_px = 3;
            // (1) the marker runs off the right end
            if( center_markerPosition + (txt_width/2.0) > legend_width ){
 
                left_markerPosition = legend_width - txt_width - buffer_px;
                var rel_markerPosition = 100 * (left_markerPosition / legend_width);
                marker+= '<div class="multi-bar-marker" style="left:' + rel_markerPosition + '%;color:black; width =' +txt_width+ ';margin-left = '+((txt_width/2.0)*-1)+';">' +
                    '<div class="multi-bar-marker-value" style="text-align: center;">' + str_val + '</div>' +
                    //'<span class="icon-' + icon + '"></span>' +
                    '</div>';
            // (2)
            } else if ( center_markerPosition - (txt_width/2.0) < 0 ){

                left_markerPosition = buffer_px;
                var rel_markerPosition = 100 * (left_markerPosition / legend_width);
                marker+= '<div class="multi-bar-marker" style="left:' + rel_markerPosition + '%;color:black; width =' +txt_width+ ';margin-left = '+0+';">' +
                '<div class="multi-bar-marker-value" style="text-align: center;">' + str_val + '</div>' +
                //'<span class="icon-' + icon + '"></span>' +
                '</div>';

            // (3)
            } else {
   
                left_markerPosition = center_markerPosition - (txt_width/2.0);
                var rel_markerPosition = 100 * (left_markerPosition / legend_width);

                marker+= '<div class="multi-bar-marker" style="left:' + rel_markerPosition + '%;color:black; width =' +txt_width+ ';margin-left = '+((txt_width/2.0)*-1)+';">' +
                '<div class="multi-bar-marker-value" style="text-align: center;">' + str_val + '</div>' +
                //'<span class="icon-' + icon + '"></span>' +
                '</div>';
            }

            // minor adjustment
            
            //alert(txt_width);
            //alert(markerPosition);
            
            // style = "left:POS%" explicitly places the div by the left point of the text. The width of the element is set to the maximum it can posssibly be.
            // Within this the number is centered. The left point of the text becomes the middle by a left margin adjust (margin-left) based on the known (max) size of the text.
            
        }
        marker+='</div>';
        return marker;
    }

    var createLegend = function(arValue,options,ele){
        var boxLeg = '<div class="multi-bar-legend-box">';
        if(options.legend.title){
            var boxTitleLeg = options.legend.titleClass ? '<div class="' + options.legend.titleClass + '">' + options.legend.title + '</div>':'<div class="multi-bar-legend-title">' + options.legend.title + '</div>'
            boxLeg+=boxTitleLeg;
        }
        var itemClass = options.legend.itemClass ? 'class="multi-bar-legend-item ' + options.legend.itemClass + '"':'class="multi-bar-legend-item"';
        for(var i=0;i<arValue.length;i++){
            var value = arValue[i] && typeof arValue[i]=='object' ? arValue[i].value:arValue[i];
            var label = arValue[i] && typeof arValue[i]=='object' ? arValue[i].label:"Item";
            var color = arValue[i] && typeof arValue[i]=='object' ? arValue[i].color:"black";

            boxLeg+= '<div ' + itemClass + '>' +
                '<span class="icon-circle" style="color:' + color + '"></span> ' +
                '<span class="multi-bar-legend-item-label">' + label + ": " + value + '</span>' +
                '</div>';
        }
        boxLeg+='</div>';
        var conLegend = options.legend.content;
        if(!conLegend){
            $(ele.find(".multi-bar-legend-box")[0]).remove();
            $(ele.find(".multi-bar")[0]).append(
                boxLeg
            );
            $(ele.find(".multi-bar-content")[0]).removeClass("no-legend");
            $(ele.find(".multi-bar-content")[0]).addClass("yes-legend");
            $(ele.find(".multi-bar-legend-box")[0]).css("width","28%");
            if(options.thermometer){
                var width_content = options.size && options.size == "big" ?  (parseFloat($(ele.find(".multi-bar")[0]).css("width"))/100*68)-62:(parseFloat($(ele.find(".multi-bar")[0]).css("width"))/100*68)-51;
                $(ele.find(".multi-bar-content")[0]).css("width",width_content + "px");
            }
        }
        else{
            $($(conLegend).find(".multi-bar-legend-box")[0]).remove();
            $(conLegend).append(
                boxLeg
            );
            $($(conLegend).find(".multi-bar-legend-box")[0]).css("margin","0%");
        }

    }

    var colors={
        defaults: ["green","yellow","orange","red","purple","blue","black","white"],
        hot:["#F9F9BD","#F7F411","#ECD024","#FFA500","#E08E00","#FF350A","#E90000","#BE0028","#C10069","#8A0079"],
        cold:["#A4FCB7","#A4FCD6","#A4FCF5","#A4F2FC","#A4E1FC","#A4CDFC","#A4ACFC","#5479CE","#4759FF","#0019FF"]
    };
    var shadow_type={
        center:"box-shadow:0 0px 4px 0 #666",
        top:"box-shadow:0px -2px 2px 0 #666",
        left:"box-shadow:-3px 0 2px 0 #666",
        right:"box-shadow:3px 0 2px 0 #666",
        bottom:"box-shadow:0px 2px 2px 0 #666",
        top_left:"box-shadow:-2px -2px 2px 0 #666",
        top_right:"box-shadow:2px -2px 2px 0 #666",
        bottom_left:"box-shadow:-2px 2px 2px 0 #666",
        bottom_right:"box-shadow:2px 2px 2px 0 #666",
    }

    var MultiBar = function (element, options) {

        this.element = $(element);

        var box = '<div class="multi-bar';

        if(options.size)
            box += ' multi-bar-' + options.size + ' ';

        if(options.multiBarValueVisibility && options.multiBarValueVisibility == "hidden")
            box += ' multi-bar-value-box-hidden ';
   
        var legend_text = '';
        
            if(options.displaying == 'origin2all_routes'){legend_text = 'Number of trips via the road segment from the selected region to all other regions.';}
            if(options.displaying == 'dest2all_routes'){legend_text = 'Number of trips via the road segment to the selected region from all other regions.';}
            if(options.displaying == 'origin2dest'){legend_text = 'Number of trips via the road segment between the selected origin and destination regions.';}
            if(options.displaying == 'all2all_routes'){legend_text = 'Number of trips via the road segment in any direction over the period.';}

        
            if(options.displaying == 'origin2all_grid'){legend_text = 'Number of trips from the selected region.';}
            if(options.displaying == 'dest2all_grid'){legend_text = 'Number of trips to the selected region.';}
            if(options.displaying == 'all2all_grid_origin'){legend_text = 'Total trips departing from each region.';}
            if(options.displaying == 'all2all_grid_dest'){legend_text = 'Total trips arriving at each region.';}
        
        box+='"><div class="multi-bar-content no-legend"><div class="multi-bar-caption">'+legend_text+'</div><div class="multi-bar-marker-content"></div>';

        var bar;
        if(options.type && options.type=="hot")
            bar = createBar_hot(options);
        else if(options.type && options.type=="cold")
            bar = createBar_cold(options);
        else
            bar = createBar(options);

        box+= bar.mulBar + bar.valBar;
        box+= '</div></div>';

        this.element.html(
            box + '<div style="clear:both"></div>'
        );

        this.options = options;

        if(options.initValue && typeof options.initValue == 'object'){
            this.setValue(options.initValue);
        }

        //Code for activate initial animation of the multi-bar
        /*var ele = this.element;
        setTimeout(function(){
            $(ele.find(".multi-bar-content.no-legend")[0]).css("width","100%");
        },50);*/
    };

    MultiBar.prototype = {
        constructor: MultiBar,
        setValue: function(arValue){
            var marker = createMarker(arValue,this.options);
            $($(this.element).find(".multi-bar-marker-content")[0]).replaceWith(marker);
            var legend = this.options.legend && this.options.legend.show==true;
            if(legend){
                var boxLegend = createLegend(arValue,this.options,this.element);
            }
        },
        destroy: function(){
            $($(this.element).find(".multi-bar")[0]).remove();
            var legend = this.options.legend && this.options.legend.show==true;
            if(legend){
                var contLegend = this.options.legend.content;
                if(contLegend)
                    $($(contLegend).find(".multi-bar-legend-box")[0]).remove();
            }
        }
    };

    $.fn.multibar = function (options) {
        var refresh = true;
        if( options == 'setValue') {
            refresh = false;
        }
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function () {

            var $this = $(this),
                data = $this.data('multibar'),
                opts;
            if (refresh) { // Gavin update... was !data, i.e. we always want to update the data
                if(!options){
                    $this.data('multibar',new MultiBar(this, $.fn.multibar.defaults));
                    return
                }
                if(!options.min && options.min!=0)
                    options.min = $.fn.multibar.defaults.min;
                if(!options.max && options.max!=0)
                    options.max = $.fn.multibar.defaults.max;
                if(!options.multiBarValue){
                    options.multiBarValue = [];
                    var step = (options.max-options.min)/5
                    var indice = options.min+step;
                    for(var i=0;i<5;i++){
                        options.multiBarValue.push(
                            {
                                visibility:"visible",
                                val:parseInt(indice),
                                bgColor:colors.defaults[i]
                            }
                        );
                        indice+=(options.max-options.min)/5;
                    }

                }
                opts = $.extend( {}, $.fn.multibar.defaults, options );
                $this.data('multibar',new MultiBar(this, options));

            }
            else if (typeof options == 'string' && typeof data[options] == 'function') {
                data[options].apply(data, args);

            }
        });
    };

    $.fn.multibar.defaults = {
        min:0,
        max:10,
        type:"normal",
        thermometer:false,
        reverse:false,
        posMarker:"outside",
        iconMarker:"arrow-down",
        multiBarValue:[
            {
                visibility:"visible",
                val:2,
                bgColor:"green"
            },
            {
                visibility:"visible",
                val:4,
                bgColor:"yellow"
            },
            {
                visibility:"visible",
                val:6,
                bgColor:"orange"
            },
            {
                visibility:"visible",
                val:8,
                bgColor:"red"
            },
            {
                visibility:"visible",
                val:10,
                bgColor:"purple"
            }
        ],
        multiBarValueVisibility:"visible",
        shadow:false
    };

}(jQuery));
