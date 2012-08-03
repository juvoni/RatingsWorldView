/*!
 * jvmSlider version 0.1
 * Written by Karan Jain
 *
 * Dependencies:
 *  jVectorMap and World Map: http://jvectormap.owl-hollow.net/#download
 *  selectToUISlider: http://www.filamentgroup.com/lab/update_jquery_ui_slider_from_a_select_element_now_with_aria_support/
 *  jQueryUI-1.8.15: http://jqueryui.com/download
 *  jQuery-1.6.2: http://docs.jquery.com/Downloading_jQuery#Past_Releases
 */
        		
	/*!
    * EDIT THIS PORTION PRIOR TO USING
    */
//SP Radar Commit

$(window).load(function(){
$.fn.sparkline.defaults.common.lineColor = '#CC0033';
$.fn.sparkline.defaults.common.fillColor = '#99ccff';

$.reject({  
        reject: {  
            all: false, // Microsoft Internet Explorer  
            msie5: true, msie6: true, msie7: true 
        }, 
        display: ['firefox','chrome','opera','gcf'], // Displays only firefox, chrome, and opera  
        browserInfo: {  
            chrome: {  
                text:'Chrome 14+' // Text Link  
            }
    }});


		

	$three = $('#three');						
	$map = $('#map');
	$three_p = $('#three p');
	$ConId = $('#counName');
	$gdp = $('.gdp');
	$gdpChange = $('.gdpChange');
	$gdpPerChange = $('.gdpPerChange');
	

	$period = $('#period');

	$infoToClick = $('#three .infoToClick');
	$Conid = $('#CountryIdentifier');
	$play = $('#play');
	$date = $('#date');
	$rtgSect = $('#container .rtgActSection');
	$gdp = $('#conData .gdpSection p.gdpData');
	$gdpLine = $('.gdpLine');
	$gdpPerCap = $('#conData .gdpSection p.gdpData');
	$conName = $('#conData .gdpSection p.cName');



	checkVersion_Init();

	//------Edit Start---
	var Cl = [];
	var debtObj = []; 
	var countrylimit = [];
	var mapValues = {};
	var mapLabels = {};
	mapRatingAction = {};
	var scoreValN = [];
	

	var numOfAff,
	numOfDown,
	numOfUp,
	numOfNew,
	numOfNewFromConfid,
	numOfNewFromNr;


	AffB = [],DowB = [],UpB = [],NewB = [],ConfB = [],NrB = [], gdpHist = [], gdpChg = [], gdpPerChg = [];

	uiVal = '';

	var mapBColor = '#FFFFFF';

	mapSetBGColor = function(value){
		mapBColor = value;
	};


	// jvmSlider Options
	startDate = 2000; // Default startDate set to 2000
	endDate = 2011;
	slideSpeed = 1250; // Default slideSpeed set to 750ms
	selectedYear = startDate;
	currentCon = '';
	
	periodPrefix = "Year: "; // A prefix for 'period' div on front page
	// Calculating number of periods, starts at -1 to include first year
	timePeriods = -1;

	var getThisCountry = function(conName){
		var c = conName.toUpperCase();
		
		var nameOfCon;
		for(var conSelect = 0; conSelect<Cl.length; conSelect++){
			if(Cl[conSelect].countryCode() !== 'undefined'){
				if(Cl[conSelect].countryCode() === c){
					nameOfCon = Cl[conSelect].countryName();
					break;
				}
				else{
					nameOfCon = 'Not Rated';
				}
			}

		}

		return nameOfCon;
	};

	getThisCountryIndex = function(conNamef){
		var c = conNamef.toUpperCase();
		var r;
		for(var conSelect = 0; conSelect<Cl.length; conSelect++){
			if(Cl[conSelect].countryCode() !== 'undefined'){
				if(Cl[conSelect].countryCode() === c){
					r = conSelect;
					break;
				}
			}
		}
		return r;
	};

	scoreIndex = function(value){
		for(var e = 0; e<scoreValN.length;e++){
			if(scoreValN[e] === value){
				return e;
			}
		}
	};

	getScores = function(conName){
		var c = conName.toUpperCase();
		
		var scoreArray = [];
		for(var conSelect = 0; conSelect<Cl.length; conSelect++){
			if(Cl[conSelect].countryCode() !== 'undefined'){
				if(Cl[conSelect].countryCode() === c){
					for(var t = 0; t<5;t++){
						switch(t){
							case 0: scoreArray[t] = scoreIndex(Cl[conSelect].getScore().political());
							break;
							case 1: scoreArray[t] = scoreIndex(Cl[conSelect].getScore().fiscal());
							break;
							case 2: scoreArray[t] = scoreIndex(Cl[conSelect].getScore().external());
							break;
							case 3: scoreArray[t] = scoreIndex(Cl[conSelect].getScore().monetary());
							break;
							case 4: scoreArray[t] = scoreIndex(Cl[conSelect].getScore().economic());
							break;
							default:
						}
					}
					break;
				}
				else{
					for(var not = 0; not<5;not++){
						scoreArray[not] = 0;
					}
				}
			}

		}
		return scoreArray; 
	}


	$.getJSON('ajax/Data.json', function(data) {
		
		var i = 0;
		var n = 0;
		var rsa = [],
		scoreO;

			for(var de = 0; de<11; de++){
				if(de >=1){
					scoreValN[de]=+ (scoreValN[de-1]+0.5);	
				}
				else{
					scoreValN[de]=+ 0;
				}
			}
		var re;
		$.each(data, function(){

			debtObj.push(new Debt(this['Rating'], new Date(this['Release Date']), this['Rtg Action'], this['Rtg Symbol Sort'], new Date(this['As of Year'])));							
			 if($.inArray(this['Name'],countrylimit) === -1 ){
				for(var fi = 0; fi<5;fi++){
					re = Math.floor(Math.random()*(10-2 +1)+2);
					rsa[fi] = scoreValN[re];
				}
				scoreO = new Score(rsa[0],rsa[1],rsa[2],rsa[3],rsa[4]);
				Cl[n]= new Country(this['Org ID'], this['Org Legal Name'], this['Name'], this['Org Region'], debtObj[i], scoreO);
				Cl[n].longitude(this['longitude']);
				Cl[n].latitude(this['latitude']);
				Cl[n].countryCode(this['ISO Two Char Country Code']);
				n++;
			}
			else{
				for(var x = 0; x<Cl.length;x++){
				 	if(Cl[x].countryName() === this['Name']){
				 		Cl[x].debtB(debtObj[i]);
				 		break;
				 	}
				}	
			}
			i++;
			countrylimit.push(this['Name']);

		});
		$.getJSON('ajax/World_Data_GDP.json', function(gdp) {
		$.each(gdp, function(){
			for(startYear = 2000; startYear<=endDate; startYear++){
				for(var x = 0; x<Cl.length;x++){
					if(Cl[x].hasYear(startYear)){
						if(Cl[x].countryName() === this['Country Name']){
							Cl[x].getDebtOfYear(startYear).GdP(this[startYear]);
							break;
						}
					}
				
				}
			}

		});
		
	});

	// $.getJSON('ajax/World_Data_GDP_Per_Gov_Debt.json', function(perGdp) {
	//	$.each(perGdp, function(){
	//	   	for(startYear = 2000; startYear<=endDate; startYear++){
	//	   		for(var x = 0; x<Cl.length;x++){
	//	   			if(Cl[x].hasYear(startYear)){
	//	   				if(Cl[x].countryName() === this['Country Name']){
	//	   					Cl[x].getDebtOfYear(startYear).GdpPer(this[startYear]);
	//	   					break;
	//	   				}
	//	   			}
	  	   		
	//	   		}
	//	   	}
	//	});	
	// });
			
		


			yearCountMin = 2000; 
			
			(function(){
				for(var cYear = yearCountMin; cYear<=endDate; cYear++){
					mapValues[cYear] = {};
					mapLabels[cYear] = {};
					mapRatingAction[cYear] = {};

					var typeOfAction;

					numOfAff = 0,numOfDown = 0,numOfUp = 0,numOfNew = 0,numOfNewFromConfid = 0,numOfNewFromNr = 0;


			
				for(var cIndex = 0; cIndex<Cl.length;cIndex++){
					var CC = Cl[cIndex].countryCode();
					var RS;
					var rate;
					var action;
					if(Cl[cIndex].hasYear(cYear)){
						action = Cl[cIndex].getDebtOfYear(cYear).rtgAction();
						RS = Cl[cIndex].getDebtOfYear(cYear).rtgSymbol();
						rate = Cl[cIndex].getDebtOfYear(cYear).rating();
						mapValues[cYear][CC] = RS;
						mapLabels[cYear][CC] = Cl[cIndex].countryName().concat(": ",rate);

						switch (action){
							case "New": numOfNew++;
								break;
							case "Affirmation": numOfAff++;
								break;
							case "Upgrade": numOfUp++;
								break;
							case "Downgrade": numOfDown++;
								break;
							case "New from NR": numOfNewFromNr++;
								break;
							case "New from Confid": numOfNewFromConfid++;
								break;
							default:
						}

					}
				}

				for(var typeActCount = 0; typeActCount<=5; typeActCount++){
					switch(typeActCount){
						case 0: mapRatingAction[cYear]['New'] = numOfNew;
								NewB.push(numOfNew);
							break;
						case 1: mapRatingAction[cYear]['Affirmation'] = numOfAff;
								AffB.push(numOfNew);
							break;
						case 2: mapRatingAction[cYear]['Upgrade'] = numOfUp;
								UpB.push(numOfUp);
							break;
						case 3: mapRatingAction[cYear]['Downgrade'] = numOfDown;
								DowB.push(numOfDown);
							break;
						case 4: mapRatingAction[cYear]['New from NR'] = numOfNewFromNr;
								NrB.push(numOfNewFromNr);
							break;
						case 5: mapRatingAction[cYear]['New from Confid'] = numOfNewFromConfid;
								ConfB.push(numOfNewFromConfid);
							break;
						default:
					}
				}

					
			}
		})();

			
		for (property in mapValues) timePeriods++;

			var cnt = false;
	        // jVectorMap Options
			
			$(function() {
					
					$map.vectorMap({
						values: mapValues[startDate],
						// scaleColors: ['#538347','#70a056','#629022','#639022','#729421','#899921','#A0961F','#CC2820', '#BD1810'],
						scaleColors: ['#bdcb2a','#ffda00','#e31837'],//S&P Colors
						backgroundColor:mapBColor,
						normalizeFunction: 'polynomial',
						color:'#aaaaaa',
						hoverOpacity: 0.8,
						hoverColor: false,
						onLabelShow: function(event, label, code) {
							label.text(mapLabels[startDate][code]);
						},
						onRegionClick: function (event, code) {
							
							var ex;

							if(!cnt) $(this).dblclick(); 
							cnt = true;	
							var newClass = 'flag flag-'+code.toLowerCase();
							$('#CountryIdentifier #CountrySprite').attr('class', newClass);
							$ConId.text(getThisCountry(code));
							if($ConId.width() >= 70){
								ex = 85;
							}
							else{
								ex = 40;
							}
							var textW = ($ConId.width()+ex)+'px';
							$Conid.css('width',textW);
							var dy = getScores(code);	
							if (typeof threeD != "undefined") {
								threeD.updateScore(dy[0],dy[1],dy[2],dy[3],dy[4]);
							}
							if(typeof getThisCountryIndex(code) !=='undefined'){
								currentCon = Cl[ getThisCountryIndex(code)];
								var num = currentCon.getDebtOfYear(selectedYear).GdP();
								
							}
							
							if(typeof num !== 'undefined'){
								$gdp.text('GDP:'+formatCurrency(num));
								$conName.text(currentCon.countryName());
								genGdpHist();
								$gdpChange.text(formatCurrency(gdpChg[uiVal+0]));
								$gdpPerChange.text(gdpPerChg[uiVal+0].toFixed(2));
								$gdpLine.sparkline(gdpHist,{width: '55px', height: '30px'});
								colorIndiGdp();
							}
							
							


				   	    }
				   	});
				});	
        // Initializing labels, play/pause button on front page
		// DOES NOT NEED TO BE EDITED FOR PLUG IN TO WORK
			$period.html(periodPrefix + '<h2 class = "big">'+startDate+'</h2>');
			

			$rtgSect.html(ticketInit(startDate));
			$('.line').sparkline();

			$play.button({text: false,label:"play",icons: {primary: "ui-icon-play"}})
			.click(function() {playPause();});
			$('#loadingDiv').remove();

	});

	
				        // selectToUISlider Options
			$date.selectToUISlider({
				range: false,
				tooltip:false,
				labels: 6,
				sliderOptions: {
					animate: true,
					slide: function(event, ui) {
						
						$period.html(periodPrefix + '<h2 class ="big">'+(ui.value+(startDate))+ '</h2>');
						selectedYear = ui.value + startDate;

						if(ui.value -1 >=0 ){
							perNew = Math.floor((((mapRatingAction[ui.value+(startDate)]['New']-mapRatingAction[(startDate)+ui.value-1]['New'])/mapRatingAction[(startDate)+ui.value-1]['New']).toFixed(2))*100);
							perAff = Math.floor((((mapRatingAction[ui.value+(startDate)]['Affirmation']-mapRatingAction[(startDate)+ui.value-1]['Affirmation'])/mapRatingAction[(startDate)+ui.value-1]['Affirmation']).toFixed(2))*100);
							perUp = Math.floor((((mapRatingAction[ui.value+(startDate)]['Upgrade']-mapRatingAction[(startDate)+ui.value-1]['Upgrade'])/mapRatingAction[(startDate)+ui.value-1]['Upgrade']).toFixed(2))*100);
							perDown = Math.floor((((mapRatingAction[ui.value+(startDate)]['Downgrade']-mapRatingAction[(startDate)+ui.value-1]['Downgrade'])/mapRatingAction[(startDate)+ui.value-1]['Downgrade']).toFixed(2))*100); 
							Nr = ((mapRatingAction[ui.value+(startDate)]['New from NR']-mapRatingAction[(startDate)+ui.value-1]['New from NR'])/mapRatingAction[(startDate)+ui.value-1]['New from NR']);
							if(isNaN(Nr)){
								var ze = 0;
								Nr = ze;
							}
							else{
								Nr = Math.floor(Nr.toFixed(2)*100);
							}
							
							Conf = ((mapRatingAction[ui.value+(startDate)]['New from Confid']-mapRatingAction[(startDate)+ui.value-1]['New from Confid'])/mapRatingAction[(startDate)+ui.value-1]['New from Confid']);
							if(isNaN(Conf)){
								var ze = 0;
								perCon = ze;
							}
							else{
								perCon = Math.floor(Conf.toFixed(2)*100);
							}
							
						}
						genGdpHist();
						$rtgSect.html(ticketInit(ui.value+(startDate),'slide'));

						colorIndiPerCent();
						$('.line').sparkline();															
						$map.vectorMap('set', 'values', mapValues[(ui.value+(startDate))]);
					},
					change: function(event, ui) {
						$map.vectorMap('set', 'values', mapValues[(ui.value+(startDate))]);
						$map.bind('labelShow.jvectormap', function(event, label, code) {
							label.text(mapLabels[(ui.value+(startDate))][code]);
						});
						if(currentCon !== ''){
								var num = currentCon.getDebtOfYear(selectedYear).GdP();
								
								$gdp.text('GDP:'+formatCurrency(num));
								$gdpChange.text(formatCurrency(gdpChg[ui.value]));
								$gdpPerChange.text(gdpPerChg[ui.value].toFixed(2));
								colorIndiGdp();
									
							}
							uiVal = ui.value;
							
							
						
					}
				}
			}).next();
    

});    

//---edit end



    
    /*!
    * FUNCTION FOR CONTINOUSLY MOVING SLIDER UNTIL REACHES END
    */
    function slideThrough() {
    
        //getting data of current position of slider and map parameters
        var s = $date.next(), val = (+(s.slider("values"))), min = 0, max = timePeriods;
        
        // if we haven't yet reached the end of the time periods
        if (val<max) {
            s.slider("values", 0, (val+1));
            $period.html(periodPrefix + '<h2 class ="big">'+(val+startDate+1)+'</h2>'); // setting the subtitle displaying a total for all countries on the map
        // we have reached the end of the slider
			selectedYear= val+startDate+1;
			if(currentCon !== ''){
				var num = currentCon.getDebtOfYear(selectedYear).GdP();
				$gdp.text('GDP:'+formatCurrency(num));
				$gdpChange.text(formatCurrency(gdpChg[val+1]));
				$gdpPerChange.text(gdpPerChg[val+1].toFixed(2));
				colorIndiGdp();
			}
			

						
			perNew = Math.floor((((mapRatingAction[val+startDate+1]['New']-mapRatingAction[val+startDate]['New'])/mapRatingAction[val+startDate]['New']).toFixed(2))*100);
			perAff = Math.floor((((mapRatingAction[val+startDate+1]['Affirmation']-mapRatingAction[val+startDate]['Affirmation'])/mapRatingAction[val+startDate]['Affirmation']).toFixed(2))*100);
			perUp = Math.floor((((mapRatingAction[val+startDate+1]['Upgrade']-mapRatingAction[val+startDate]['Upgrade'])/mapRatingAction[val+startDate]['Upgrade']).toFixed(2))*100);
			perDown = Math.floor((((mapRatingAction[val+startDate+1]['Downgrade']-mapRatingAction[val+startDate]['Downgrade'])/mapRatingAction[val+startDate]['Downgrade']).toFixed(2))*100); 
			Nr = ((mapRatingAction[val+startDate+1]['New from NR']-mapRatingAction[val+startDate]['New from NR'])/mapRatingAction[val+startDate]['New from NR']);

			if(isNaN(Nr)){
				var ze = 0;
				Nr = ze;
			}
			else{
				Nr = Math.floor(Nr.toFixed(2)*100);
			}
			
			Conf = ((mapRatingAction[val+startDate+1]['New from Confid']-mapRatingAction[val+startDate]['New from Confid'])/mapRatingAction[val+startDate]['New from Confid']);
			if(isNaN(Conf)){
				var ze = 0;
				perCon = ze;
			}
			else{
				perCon = Math.floor(Conf.toFixed(2)*100);
			}

				$rtgSect.html(ticketInit(val+startDate+1,'slide'));
				
				$('.line').sparkline();
				
				colorIndiPerCent();
	

        } else if (val=max) {
            s.slider("values", 0, val);
            selectedYear = val+startDate;
			if(currentCon !== ''){
				var num = currentCon.getDebtOfYear(selectedYear).GdP();
				$gdp.text('GDP:'+formatCurrency(num));
				$gdpChange.text(formatCurrency(gdpChg[val]));
				$gdpPerChange.text(gdpPerChg[val].toFixed(2));
				colorIndiGdp();
			}
            
							perNew = Math.floor((((mapRatingAction[val+startDate]['New']-mapRatingAction[val+startDate-1]['New'])/mapRatingAction[val+startDate-1]['New']).toFixed(2))*100);
							perAff = Math.floor((((mapRatingAction[val+startDate]['Affirmation']-mapRatingAction[val+startDate-1]['Affirmation'])/mapRatingAction[val+startDate-1]['Affirmation']).toFixed(2))*100);
							perUp = Math.floor((((mapRatingAction[val+startDate]['Upgrade']-mapRatingAction[val+startDate-1]['Upgrade'])/mapRatingAction[val+startDate-1]['Upgrade']).toFixed(2))*100);
							perDown = Math.floor((((mapRatingAction[val+startDate]['Downgrade']-mapRatingAction[val+startDate-1]['Downgrade'])/mapRatingAction[val+startDate-1]['Downgrade']).toFixed(2))*100); 
							Nr = ((mapRatingAction[val+startDate]['New from NR']-mapRatingAction[val+startDate-1]['New from NR'])/mapRatingAction[val+startDate-1]['New from NR']);
							if(isNaN(Nr)){
								var ze = 0;
								Nr = ze;
							}
							else{
								Nr = Math.floor(Nr.toFixed(2)*100);
							}
							
							Conf = ((mapRatingAction[val+startDate]['New from Confid']-mapRatingAction[val+startDate-1]['New from Confid'])/mapRatingAction[val+startDate-1]['New from Confid']);
							if(isNaN(Conf)){
								var ze = 0;
								perCon = ze;
							}
							else{
								perCon = Math.floor(Conf.toFixed(2)*100);
							}
				
            $period.html(periodPrefix + '<h2 class ="big">'+(val+startDate)+'</h2>');

			$rtgSect.html(ticketInit(val+startDate,'slide'));
			$('.line').sparkline();
			colorIndiPerCent();
            clearInterval( startSlide );
            
            //setting options for play/pause button to change appearance
            var Options;
            Options = {label:"play",icons:{primary: "ui-icon-play"}};
            $play.button("option",Options);
        }
    };
        
    /*!
    * FUNCTION FOR THE PLAY/PAUSE BUTTON
    */
    function playPause() {
        if ($play.text() === "play") {
            
            //setting Options for play/pause button to change appearance
            var Options;
            Options = {label:"pause",icons:{primary: "ui-icon-pause"}};
            $play.button("option",Options);
            
            //getting data of current position of slider and map parameters
            var s = $date.next(), val = (+(s.slider("values"))), min = 0, max = timePeriods;
            
            //starting the slide
            if (val<max) {
                startSlide = setInterval("slideThrough()", slideSpeed);
            //stopping the slide because it reached the end
            } else {
                s.slider("values", 0, min);
                $period.html(periodPrefix +'<h2 class ="big">'+ (min+startDate)+'</h2>');
                startSlide = setInterval("slideThrough()", slideSpeed);
            }
            
        } else {
            
            //stopping the slide if user hits play button again
            clearInterval( startSlide );
            
            //setting Options for play/pause button to change appearance
            var Options;
            Options = {label:"play", icons:{primary: "ui-icon-play"}};
            $play.button("option", Options);
                            
            //getting data of current position of slider and map parameters
            var s = $date.next(), val = (+(s.slider("values"))), min = 0, max = timePeriods;
                                
            //setting the value at the current place
            s.slider("values", 0, val);
            $period.html(periodPrefix + '<h2 class ="big">'+(val+startDate)+'</h2>');
        }
    };

    

	function getInternetExplorerVersion()
	// Returns the version of Internet Explorer or a -1
	// (indicating the use of another browser).
	{
	  var rv = -1; // Return value assumes failure.
	  if (navigator.appName == 'Microsoft Internet Explorer')
	  {
	    var ua = navigator.userAgent;
	    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	    if (re.exec(ua) != null)
	      rv = parseFloat( RegExp.$1 );
	  }
	  return rv;
	};

	function checkVersion_Init()
	{
		var ver = getInternetExplorerVersion();
		var text = '3D disabled due to incompatibility';
		if ( ver >= 0.0 && ver <=8.0){
			$infoToClick.remove();
			$three_p.remove();
			$three.html('<p class = "sadInfo">'+text+'</p>'+'<hr>'+'<img class ="sad"src="images/sad_ie_v2.gif" alt="Sad Ie"></img>');
			$three.css({width:'300px', height: '170px',marginTop:'115px'});
		}
		else if(ver >= 9.0 ||ver <= -1){
			$map.one("click", function(event) {
				$infoToClick.remove();
				$Conid.show();
				$Conid.css('width','90');
				threeD = new threeSet();
				twoD = twoDRadar();	
			});
		}
};


function ticketInit(val,type)
{
		var renderTicker = '<p class = tickInfo>Sovereign Rating Actions</p>';
		renderTicker += '<ul class = "ticker">';
		for(var i = 0; i<6;i++){
			
				renderTicker+= '<li>'+'<div class = "actionStat">'+'<p class = "tickTitle">'
				switch(i){
					case 0: renderTicker+='Upgrade:'+'</p>'+'&nbsp;'+mapRatingAction[val]['Upgrade'];
					break;
					case 1: renderTicker+='Downgrade:'+'</p>'+'&nbsp;'+mapRatingAction[val]['Downgrade'];
					break;
					case 2: renderTicker+='New Rating:'+'</p>'+'&nbsp;'+mapRatingAction[val]['New'];
					break;
					case 3: renderTicker+='Affirmations:'+'</p>'+'&nbsp;'+mapRatingAction[val]['Affirmation'];
					break;
					case 4: renderTicker+='New from NR:'+'</p>'+'&nbsp;'+mapRatingAction[val]['New from NR'];
					break;
					case 5: renderTicker+='New from Confid:'+'</p>'+'&nbsp;'+mapRatingAction[val]['New from Confid'];
					break;
					default:
				}
				renderTicker +='</div>';
				if(type === 'slide'){
					switch(i){
						case 0: renderTicker+= '<span class = "percent">'+perUp+'</span>'+' &nbsp<span class="line">';
						break;
						case 1: renderTicker+='<span class = "percent">'+perDown+'</span>'+' &nbsp<span class="line">';
						break;
						case 2: renderTicker+='<span class = "percent">'+perNew+'</span>'+' &nbsp<span class="line">';
						break;
						case 3: renderTicker+='<span class = "percent">'+perAff+'</span>'+' &nbsp<span class="line">';
						break;
						case 4: renderTicker+='<span class = "percent">'+Nr+'</span>'+' &nbsp<span class="line">';
						break;
						case 5: renderTicker+='<span class = "percent">'+perCon+'</span>'+' &nbsp<span class="line">';
						break;
						default:
					}
				}
				else{
					renderTicker+='<span class = "percent">'+'--'+'</span>'+' &nbsp<span class="line">';
				}
				
				for(var x = 0; x<UpB.length;x++){
					switch(i){
						case 0: renderTicker+= (x<11)?UpB[x]+',':UpB[x];
						break;
						case 1: renderTicker+=(x<11)?DowB[x]+',':DowB[x];
						break;
						case 2: renderTicker+=(x<11)?NewB[x]+',':NewB[x];
						break;
						case 3: renderTicker+=(x<11)?AffB[x]+',':AffB[x];
						break;
						case 4: renderTicker+=(x<11)?NrB[x]+',':NrB[x];
						break;
						case 5: renderTicker+=(x<11)?ConfB[x]+',':ConfB[x];
						break;
						default:
					}
				}
				renderTicker+='</span>'+'</li>';
		}
		renderTicker+='</ul>';

	return renderTicker;
};

function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g,'');
	if(isNaN(num))
	num = "0";
sign = (num == (num = Math.abs(num)));
num = Math.floor(num*100+0.50000000001);
cents = num%100;
num = Math.floor(num/100).toString();
if(cents<10)
cents = "0" + cents;
for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
num = num.substring(0,num.length-(4*i+3))+','+
num.substring(num.length-(4*i+3));
return (((sign)?'':'-') + '$' + num);
}

function getThisCountry(conName){
		var c = conName.toUpperCase();
		var con;
		var search = false;
		for(var conSelect = 0; conSelect<Cl.length; conSelect++){
			if(Cl[conSelect].countryCode() !== 'undefined'){
				if(Cl[conSelect].countryCode() === c){
					con = Cl[conSelect].countryName();
					search = true;
					break;
				}
			}

		}
		if(!search) con = 'Data not collected';
	return con;
};

function colorIndiPerCent(){
		$('span.percent').each(function(){
			var num = $(this).text();

			if(num >0){
				$(this).css('color','#178811');
				$(this).animate({textShadow: "#178811 0 0 10px"},600);
				$(this).prepend('<div class = "arrowRtg"></div>');                                          	
				$('.arrowRtg',this).css({'background-position': '0px 0px', 'width':'10px','height':'10px'});	
			}
			else if(num <0){
				$(this).css('color','#C00');
				$(this).animate({textShadow:"#C00 0 0 10px"},600);
				$(this).prepend('<div class = "arrowRtg"></div>');
				$('.arrowRtg',this).css({'background-position': '-10px -0px','width':'10px','height':'10px'});
			}
			else{
				$(this).css('color','black');
			}
			$(this).animate({opacity:"0.6"},300);
			$(this).append('&#37;');

		});
};

function colorIndiGdp(){

		$('.gdpChange').each(function(){
			var str = $(this).text();
			var num = Number(str.replace(/[^0-9\.-]+/g,""));

			if(num >0){
				$(this).css('color','#178811');
				$(this).animate({textShadow: "#178811 0 0 10px"},600);
				$('.arrow').css({'background-position': '0px 0px', 'width':'10px','height':'10px'});	
			}
			else if(num <0){
				$(this).css('color','#C00');
				$(this).animate({textShadow:"#C00 0 0 10px"},600);
				$('.arrow').css({'background-position': '-10px -0px','width':'10px','height':'10px'});
				
			}
			else if(num == 0){
				$(this).css('color','black');
			}
			$(this).animate({opacity:"0.8"},450);

		});
		$('.gdpPerChange').each(function(){
			var num = $(this).text();

			if(num >0){
				$(this).css('color','#178811');
				$(this).animate({textShadow: "#178811 0 0 10px"},600);	
			}
			else if(num <0){
				$(this).css('color','#C00');
				$(this).animate({textShadow:"#C00 0 0 10px"},600);
			}
			else{
				$(this).css('color','black');
			}
			
			$(this).append('&#37;');
		});
};

function genGdpHist(){
		var i = 0;
		gdpChg[0] = '--';
		gdpPerChg[0] = 0;

		for(var id = startDate; id<=endDate;id++){
			if(currentCon!== ''){
				gdpHist[i] = currentCon.getDebtOfYear(id).GdP();

			if(i>=1){
				gdpChg[i] = (gdpHist[i] && gdpHist[i-1])?gdpHist[i] - gdpHist[i-1]: '--';
				gdpPerChg[i] = (gdpHist[i] && gdpHist[i-1])?((gdpHist[i] - gdpHist[i-1])/gdpHist[i-1])*100:'--';
			}
			i++;
			}
	
		}
};

