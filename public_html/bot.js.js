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
    var informations=null;
    
    
    this.getMode=function(){
        checkMode();
        return mode;
    };
    var getMode=this.getMode;
    
    
    
    var checkMode=function(){
        if($('.v-absolutelayout-wrapper-addGameLink').length>0){
            mode='lobby';
        }else if($('td.v-tabsheet-tabitemcell-focus-first').length>0){
            mode='inforamtion';
        }else if($('td.v-tabsheet-tabitemcell').eq(1).hasClass('v-tabsheet-tabitemcell-selected')){
            mode='decision';
        }else if($('td.v-tabsheet-tabitemcell').eq(2).hasClass('v-tabsheet-tabitemcell-selected')){
            mode='results';
        }else if($('#addNewGameButton').length>0){
            mode='new-game';
        }
    };
    
    
    
    this.setMode=function(mode,callback,error){
        if(mode=='lobby'){
            console.log('BOT: going to lobby...');
            setModeDone=setInterval(function(){
                if(getMode()=='lobby'){
                    clearInterval(setModeDone);
                    console.log('BOT: lobby!');
                    if(typeof(callback)!='undefined') callback.call();
                    return true;
                }
            },500);
            window.location='/#!';
        }else if(mode=='information' || mode=='decision' || mode=='result'){
            if(getMode()=='lobby'){
                console.log('BOT: enter the game first!');
                if(typeof(error)!='undefined') error.call();
            }
            console.log('BOT: going to '+mode+'...');
            setModeDone=setInterval(function(){
                if(getMode()!='lobby'){
                    clearInterval(setModeDone);
                    console.log('BOT: game!');
                    setModeDone=setInterval(function(){
                        if(getMode()==mode){
                            clearInterval(setModeDone);
                            console.log('BOT: '+mode+'!');
                            if(typeof(callback)!='undefined') callback.call();
                            return true;
                        }
                    },500);
                    if(mode=='information') $('td.v-tabsheet-tabitemcell').eq(0).click();
                    else if(mode=='decision') $('td.v-tabsheet-tabitemcell').eq(1).click();
                    else if(mode=='result') $('td.v-tabsheet-tabitemcell').eq(2).click();
                    else if(typeof(error)!='undefined') error.call();
                    return true;
                }
            },500);
            window.location='/#!game';
        }else{
            if(typeof(error)!='undefined') error.call();
            return false;
        }
    };
    var setMode=this.setMode;
    
    
    
    this.changeGame=function(game,callback,error){
        this.setMode('lobby',function(){
            console.log('BOT: enter "'+game+'" game...');
            if($('.v-button.v-widget[id="join-'+game+'"]').length==0){
                console.log('BOT: there is no "'+game+'" game!');
                if(typeof(error)!='undefined') error.call();
                return false;
            }else if(jQueryVaadin('.v-button.v-widget[id="join-WDEC 91210"] .v-button-caption').text()=='Rezultaty'){
                console.log('BOT: game "'+game+'" has ended already!');
                if(typeof(error)!='undefined') error.call();
                return false;
            }
            changeGameDone=setInterval(function(){
                if(getMode()!='lobby'){
                    clearInterval(changeGameDone);
                    console.log('BOT: game "'+game+'"!');
                    if(typeof(callback)!='undefined') callback.call();
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
            credit: true
        };
        $.extend(defaults,options);
        options=defaults;
        $.extend(information,options);
        setMode('lobby',function(){
            newGameDone=setInterval(function(){
                if(getMode()=='new-game'){
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
                            if(getMode()=='lobby'){
                                clearInterval(newGameDone);
                                console.log('BOT: game created!');
                                if(typeof(callback)!='undefined') callback.call();
                            }else if($('.v-errorindicator').length>1){
                                clearInterval(newGameDone);
                                console.log('BOT: game not created!');
                                if(typeof(error)!='undefined') error.call();
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
    
    var setDecisions=function(decisions){
        setMode('decision',function(){
            if(typeof(decisions.volume)!='undefined') $('.v-textfield').eq(1).val(decisions.volume).vChange();
            if(typeof(decisions.quality)!='undefined') $('.v-textfield').eq(3).val(decisions.quality).vChange();
            if(typeof(decisions.tvAds)!='undefined') $('.v-textfield').eq(5).val(decisions.tvAds).vChange();
            if(typeof(decisions.webAds)!='undefined') $('.v-textfield').eq(8).val(decisions.webAds).vChange();
            if(typeof(decisions.magazineAds)!='undefined') $('.v-textfield').eq(10).val(decisions.magazineAds).vChange();
            if(typeof(decisions.price)!='undefined') $('.v-textfield').eq(12).val(decisions.price).vChange();
            if(typeof(decisions.credit)!='undefined') $('.v-textfield').eq(33).val(decisions.credit).vChange();
            if(typeof(decisions.repayment)!='undefined') $('.v-textfield').eq(35).val(decisions.repayment).vChange();
        });
    };
    
    var getInformations=function(decisions,callback){
        setMode('decision',function(){
            informations.money=$('.v-textfield').eq(29).val();
            setMode('results',function(){
                informations.sold=$('.v-textfield').eq(1).val();
                callback.call();
            });
        });
    };
    
    this.start=function(){
        var g;
        var endGame=function(callback){
            console.log('BOT: store game information...');
            /* todo: store information */
            console.log('BOT: store game information...');
        }
        endTerm=function(callback){
            newGameDone=setInterval(function(){
                if(true /* todo: ready for next term condition */){
                    clearInterval(newGameDone);
                    callback.call();
                }
            });
            $('#sendDecisionButton .v-button-wrap').click();
        };
        var makeDecisions=function(term,end){
            informations=getInformations(function(){
                if(term>=information.terms){
                    console.log('BOT: game has ended!');
                    end.call();
                    return true;
                }else if(term==0){
                    decisions={
                        volume: 70000,
                        quality: 63,
                        tvAds: 50000,
                        webAds: 12000,
                        magazineAds: 11000,
                        price: 25,
                        credit: 800000,
                        repayment: 184000
                    };
                }
                /* todo: decisions! */
                setDecisions(decisions);
                endTerm(function(){makeDecisions(term+1,end)});
            });
        }
        var enterG=function(end){
            changeGame(g,function(){makeDecisions(0,end)});
        };
        g=newGame({},function(){enterG(endGame);});
        
    }
};

var BOT=new _BOT();