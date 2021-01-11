feather.replace();

$(function(){
    "use strict";

    let audio = $('#audio')[0];
    let list = 0;

    audio.preload = "auto";

    $.get('resources/js/data.json', function(res){

        $('#audio').attr('src', 'resources/audios/' + res[0].audio);

        $('#song-title').html(res[0].title);
        $('#artist-info').html(res[0].artist);
        
        let isClicked = 0;
        $('#btn-shuffle').on('click', function(){           
            let titles = [];
            isClicked = isClicked + 1;
            res.forEach(el => {
                titles.push(el.id);
            });
            
            if (isClicked == 1) {
                console.log(shuffle(titles));                
            }else{
                console.log(titles.sort());
                isClicked = 0;
            }

            $(this).toggleClass('in-active');
        });

        $('#btn-repeat').on('click', function(){
            audio.loop = true;
            $(this).toggleClass('in-active');
            if($(this).attr('title') == "Repeat: Off"){
                $(this).attr('title', 'Repeat: On');
            }else{
                $(this).attr('title', 'Repeat: Off');
            } 
        });

        $('#btn-play').on('click', function(){
            $(this).hide();
            audio.play();
            
            $('#btn-pause').show();
            runAudioTracker();
        });
    
        $('#btn-pause').on('click', function(){
            $(this).hide();

            audio.pause();

            $('#btn-play').show();
        });
        
        $('#btn-back').on('click', function(){
            list = list - 1;

            if(list > (-1)){
                $('#audio').attr('src', 'resources/audios/' + res[list].audio);
                $('#song-title').html(res[list].title);
                $('#artist-info').html(res[list].artist);
                if($('#btn-next').hasClass('in-active')){
                    $('#btn-next').removeClass('in-active');
                    $('#btn-next').attr('disabled', false);
                }

                $('#btn-play').trigger('click');
            } else {
                list = res.length;
            }

            showTable(list);
        });

        $('#btn-next').on('click', function(){
            list = list + 1;

            if(res.length > list){
                $('#audio').attr('src', 'resources/audios/' + res[list].audio);
                $('#song-title').html(res[list].title);
                $('#artist-info').html(res[list].artist);
                if($('#btn-back').hasClass('in-active')){
                    $('#btn-back').removeClass('in-active');
                    $('#btn-back').attr('disabled', false);
                }

                $('#btn-play').trigger('click');
            } else {
                list = 0;
            }

            showTable(list);
        });
        
        $('#btn-volume').on('click', function(){
            $('.range').toggleClass('d-none');
        });

        $('.range').on('mouseleave', function(){
            setTimeout(function(){
                $('.range').addClass('d-none');
                $('#btn-volume').removeClass('in-active');
            }, 500);
        });

        $('#volume-range').on('change', function(){
            let volume = $(this).val();
            audio.volume = volume;
            $('#btn-volume').attr('title', 'Volume ' + (volume * 100) + '%');
            $(this).attr('title', (volume * 100) + '%');

            if (volume == 0) {
                $('#btn-volume').addClass('in-active');
                $('.volume-x').removeClass('d-none');
                $('.volume').addClass('d-none');
                $('.volume-1').addClass('d-none');
                $('.volume-2').addClass('d-none');
            }else if(volume < 0.25){
                $('#btn-volume').removeClass('in-active');
                $('.volume-x').addClass('d-none');
                $('.volume').removeClass('d-none');
                $('.volume-1').addClass('d-none');
                $('.volume-2').addClass('d-none');
            }else if(volume < 0.75){
                $('#btn-volume').removeClass('in-active');
                $('.volume-x').addClass('d-none');
                $('.volume').addClass('d-none');
                $('.volume-1').removeClass('d-none');
                $('.volume-2').addClass('d-none');
            }else if(volume == 1){
                $('#btn-volume').removeClass('in-active');
                $('.volume-x').addClass('d-none');
                $('.volume').addClass('d-none');
                $('.volume-1').addClass('d-none');
                $('.volume-2').removeClass('d-none');
            }
        });        

        $('#btn-show').on('click', function(){          
            $(this).toggleClass('rotate');
            $('.container-wrapper').toggleClass('justify-content-between');
            $('#song-list-table').toggleClass('d-none');
            $('.music-icon').toggleClass('shrink-music-icon');
            $('#artist-info').toggleClass('shrink-size-p');
            $('#song-title').toggleClass('shrink-size-h2');
        });

        $('.table-row').on('click', function(){
            let id = $(this).attr('id');
            $('#audio').attr('src', )
        });

        function showTable(list = ''){
            let songs = [];
            let barchart2 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>';
            let barchart1 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>';

            $('#tbody').empty();
            for (let i = 0; i < res.length; i++) {
                let content = '';
                let el = res[i];
                if (list == i) {
                    let artist = el.title + ' - ' + el.artist;
                    content += '\
                    <tr class="table-primary table-row" id="'+el.id+'">\
                        <td>\
                            <span class="mr-1">'+barchart2+'</span>\
                            <span>'+artist+'</span>\
                        </td>\
                        <td class="d-flex justify-content-end">\
                            <span id="list-duration">0:00</span>\
                        </td>\
                    </tr>';
                }else{
                    content += '\
                    <tr class="table-row" id="'+el.id+'">\
                        <td colspan="2">\
                            <span>'+el.title+'</span>\
                            <span> - </span>\
                            <span>'+el.artist+'</span>\
                        </td>\
                    </tr>';
                }
                songs.push(content);
            }

            $('#tbody').append(songs);
        }

        showTable();

        function runAudioTracker(){
            let track = 0;
            const observeThis = $('#current-time')[0];
            const observer = new MutationObserver(function() {
                $('#audio-track').val(track++);

                if (track == $('#audio-track').attr('max')) {
                    track = 0;
                    $('#audio-track').val(0);
                    clearInterval(setInterval);
                }
            });

            observer.observe(observeThis, {subtree: true, childList: true});

            setTimeout(function(){
                let minsDuration = Math.floor(audio.duration / 60);
                let secsDuration = Math.floor(audio.duration % 60);
                minsDuration = (isNaN(minsDuration)) ? 0 : minsDuration;
                secsDuration = isNaN(secsDuration) ? '00' : secsDuration;
                let time =  minsDuration + ':' + secsDuration;
                $('#duration').html(time);
                $('#list-duration').html(time);
                $('#audio-track').attr('max', Math.floor(audio.duration));
            }, 1000);            

            setInterval(function(){
                let currentTime = Math.floor(audio.currentTime);
                let mins = Math.floor(currentTime / 60);  
                let secs = (currentTime % 60) + 1;
                secs = (secs < 10) ? '0' + secs : secs;
                let currentTimer = mins + ":" + secs;
                $('#current-time').html(currentTimer);

            }, 1000);
        }

        audio.onended = function(){
            $('#btn-next').trigger('click');
            $('#btn-play').hide();
            $('#btn-pause').show();
        }
    });

    // function shuffle(array) {
    //     var currentIndex = array.length, temporaryValue, randomIndex;
    
    //     while (0 !== currentIndex) {
      
    //       randomIndex = Math.floor(Math.random() * currentIndex);
    //       currentIndex -= 1;
    
    //       temporaryValue = array[currentIndex];
    //       array[currentIndex] = array[randomIndex];
    //       array[randomIndex] = temporaryValue;
    //     }
      
    //     return array;
    // }
});