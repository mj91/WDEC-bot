$=jQueryVaadin;
$.fn.extend({
  vChange: function() {
    return this.each(function() {
      this.dispatchEvent(new Event('change'));
    });
  }
});


var _BOT=function(){
    
    var mode=null;
    this.informations=new Object();
    var informations=this.informations;
    
    
    this.getMode=function(){
        checkMode();
        return mode;
    };
    var getMode=this.getMode;
    
    
    
    var checkMode=function(){
        if($('.v-absolutelayout-wrapper-addGameLink').length>0){
            mode='lobby';
        }else if($('td.v-tabsheet-tabitemcell-focus-first').length>0){
            mode='information';
        }else if($('td.v-tabsheet-tabitemcell').eq(1).hasClass('v-tabsheet-tabitemcell-selected')){
            mode='decision';
        }else if($('td.v-tabsheet-tabitemcell').eq(2).hasClass('v-tabsheet-tabitemcell-selected')){
            mode='results';
        }else if($('#addNewGameButton').length>0){
            mode='new-game';
        }
    };
    
    
    
    this.setMode=function(mode,callback,error){
        if(mode==='lobby'){
            console.log('BOT: going to lobby...');
            setModeDone=setInterval(function(){
                if(getMode()==='lobby'){
                    clearInterval(setModeDone);
                    console.log('BOT: lobby!');
                    if(typeof(callback)!=='undefined') callback.call();
                    return true;
                }
            },500);
            window.location='/#!';
        }else if(mode==='information' || mode==='decision' || mode==='results'){
            if(getMode()==='lobby'){
                console.log('BOT: enter the game first!');
                if(typeof(error)!=='undefined') error.call();
            }
            console.log('BOT: going to '+mode+'...');
            setModeDone=setInterval(function(){
                if(getMode()!=='lobby'){
                    clearInterval(setModeDone);
                    setModeDone2=setInterval(function(){
                        if(getMode()===mode){
                            clearInterval(setModeDone2);
                            console.log('BOT: '+mode+'!');
                            if(typeof(callback)!=='undefined') callback.call();
                            return true;
                        }else{
                            console.log('BOT: stuck in '+getMode()+'...');
                        }
                    },500);
                    if(mode==='information') $('td.v-tabsheet-tabitemcell').eq(0).find('div').click();
                    else if(mode==='decision') $('td.v-tabsheet-tabitemcell').eq(1).find('div').click();
                    else if(mode==='results') $('td.v-tabsheet-tabitemcell').eq(2).find('div').click();
                    else if(typeof(error)!=='undefined') error.call();
                    return true;
                }
            },500);
            window.location='/#!game';
        }else{
            if(typeof(error)!=='undefined') error.call();
            return false;
        }
    };
    var setMode=this.setMode;
    
    
    
    this.changeGame=function(game,callback,error){
        setMode('lobby',function(){
            console.log('BOT: enter "'+game+'" game...');
            if($('.v-button.v-widget[id="join-'+game+'"]').length===0){
                console.log('BOT: there is no "'+game+'" game!');
                if(typeof(error)!=='undefined') error.call();
                return false;
            }else if(jQueryVaadin('.v-button.v-widget[id="join-WDEC 91210"] .v-button-caption').text()==='Rezultaty'){
                console.log('BOT: game "'+game+'" has ended already!');
                if(typeof(error)!=='undefined') error.call();
                return false;
            }
            changeGameDone=setInterval(function(){
                if(getMode()!=='lobby'){
                    clearInterval(changeGameDone);
                    console.log('BOT: game "'+game+'"!');
                    if(typeof(callback)!=='undefined') callback.call();
                    return true;
                }
            },500);
            $('.v-button.v-widget[id="join-'+game+'"] .v-button-wrap').click();
        });
    };
    var changeGame=this.changeGame;
    
    
    this.newGame=function(options,callback,error){
        var defaults={
            name: 'BOT-NFK-'+($.now()%1000000000000),
            players: 1,
            terms: 5,
            money: 300000,
            normal: true,
            luxury: false,
            credit: true,
            fixedCost: 10000,
            volumeInitValue: 70000,
            qualityInitValue: 63,
            qualityTrend: 0,
            tvAdsInitValue: 50000,
            tvAdsTrend: 0,
            webAdsInitValue: 12000,
            webAdsTrend: 0,
            magazineAdsInitValue: 11000,
            magazineAdsTrend: 0,
            priceInitValue: 25,
            priceTrend: 0,
            creditInitValue: 800000,
            creditTrend: -800000,
            repaymentInitValue: 184000,
            results: new Array()
        };
        $.extend(defaults,options);
        options=defaults;
        $.extend(informations,options);
        setMode('lobby',function(){
            newGameDone=setInterval(function(){
                if(getMode()==='new-game'){
                    clearInterval(newGameDone);
                    console.log('BOT: setting options...');
                    $('#nameInput').val(options.name).vChange();
                    $('#playersInput').val(options.players).vChange();
                    $('.v-textfield').eq(2).val(options.terms).vChange();
                    $('.v-textfield').eq(3).val(options.money).vChange();
                    $('input[type="checkbox"]').eq(0).attr('checked',options.normal).vChange();
                    $('input[type="checkbox"]').eq(1).attr('checked',options.luxury).vChange();
                    $('input[type="checkbox"]').eq(2).attr('checked',options.credit).vChange();
                    console.log('BOT: options set!');
                    setTimeout(function(){
                        console.log('BOT: creating game...');
                        newGameDone=setInterval(function(){
                            if(getMode()==='lobby'){
                                clearInterval(newGameDone);
                                console.log('BOT: game created!');
                                if(typeof(callback)!=='undefined') callback.call();
                            }else if($('.v-errorindicator').length>1){
                                clearInterval(newGameDone);
                                console.log('BOT: game not created!');
                                if(typeof(error)!=='undefined') error.call();
                            }
                        });
                        $('#addNewGameButton .v-button-wrap').click();
                    },2000);
                }
            },500);
            window.location.href='/#!add-new-game';
        });
        return options.name;
    };
    var newGame=this.newGame;
    
    var setDecisions=function(decisions,callback){
        setMode('decision',function(){
            if(typeof(decisions.volume)!=='undefined') $('.v-textfield').eq(1).val(decisions.volume).vChange();
            if(typeof(decisions.quality)!=='undefined') $('.v-textfield').eq(3).val(decisions.quality).vChange();
            if(typeof(decisions.tvAds)!=='undefined') $('.v-textfield').eq(5).val(decisions.tvAds).vChange();
            if(typeof(decisions.webAds)!=='undefined') $('.v-textfield').eq(8).val(decisions.webAds).vChange();
            if(typeof(decisions.magazineAds)!=='undefined') $('.v-textfield').eq(10).val(decisions.magazineAds).vChange();
            if(typeof(decisions.price)!=='undefined') $('.v-textfield').eq(12).val(decisions.price).vChange();
            if(typeof(decisions.credit)!=='undefined') $('.v-textfield').eq(33).val(decisions.credit).vChange();
            if(typeof(decisions.repayment)!=='undefined') $('.v-textfield').eq(35).val(decisions.repayment).vChange();
            informations.lastDecisions=decisions;
            callback.call();
        });
    };
    
    var getInformations=function(callback){
        setMode('decision',function(){
            informations.money=$('.v-textfield').eq(29).val();
            console.log('error here?');
            setMode('results',function(){
                informations.sold=$('.v-textfield').eq(1).val();
                informations.results.push({sold: informations.sold, decisions: informations.lastDecisions});
                callback.call();
            });
        });
    };
    
    this.start=function(){
        var g;
        var endGame=function(callback){
            console.log('BOT: store game information...');
            /* todo: store information */
            console.log(informations);
            console.log('BOT: store game information...');
        };
        endTerm=function(term,callback){
            newGameDone=setInterval(function(){
                if(parseInt($('.v-label.v-widget.v-label-undef-w').eq(40).text())===term){
                    clearInterval(newGameDone);
                    callback.call();
                }
            },500);
            $('#sendDecisionButton .v-button-wrap').click();
        };
        var makeDecisions=function(term,end){
            console.log('BOT: making decisions, term: '+term);
            getInformations(function(){
                if(term>=informations.terms){
                    console.log('BOT: game has ended!');
                    end.call();
                    return true;
                }else if(term===0){
                    decisions={
                        volume: informations.volumeInitValue,
                        quality: informations.qualityInitValue,
                        tvAds: informations.tvAdsInitValue,
                        webAds: informations.webAdsInitValue,
                        magazineAds: informations.magazineAdsInitValue,
                        price: informations.priceInitValue,
                        credit: informations.creditInitValue,
                        repayment: informations.repaymentInitValue
                    };
                }else{
                    decisions={
                        volume: informations.lastDecisions.volume,
                        quality: informations.lastDecisions.quality+informations.qualityTrend,
                        tvAds: informations.lastDecisions.tvAds+informations.tvAdsTrend,
                        webAds: informations.lastDecisions.webAds+informations.webAdsTrend,
                        magazineAds: informations.lastDecisions.magazineAds+informations.magazineAdsTrend,
                        price: informations.lastDecisions.price+informations.priceTrend,
                        credit: informations.lastDecisions.credit+informations.creditTrend
                    };
                }
                $(document).on('decisionsSet',function(){
                    var availableMoney=$('.v-textfield').eq(43).val();
                    var volume=parseInt($('.v-textfield').eq(1).val());
                    var singleCost=$('.v-textfield').eq(4).val();
                    if(availableMoney<0 || availableMoney>singleCost){
                        var decisions={
                            volume: volume+Math.floor(availableMoney/singleCost)
                        };
                        setDecisions(decisions,function(){$(document).trigger('decisionsSet');});
                    }else{
                        $(document).unbind('decisionSet');
                        endTerm(term+1,function(){makeDecisions(term+1,end);});
                    }
                });
                setDecisions(decisions,function(){$(document).trigger('decisionsSet');});
            });
        };
        var enterG=function(end){
            changeGame(g,function(){makeDecisions(0,end);});
        };
        g=newGame({},function(){enterG(endGame);});
    };
};
var BOT=new _BOT();
BOT.start();