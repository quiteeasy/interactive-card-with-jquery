String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

const name = $("<span class='fullName'>FULL NAME</span>").css('bottom', '0').css('opacity', '1');
$('.card-item__info').append(name);
let inter;
function foc(id, h){
    clearInterval(inter);
    inter = setInterval(() => {
        if($('.card-item__side').eq(0).css('transform')[9] == 1){
            const pos = $(id).position();
            const width = $(id).outerWidth();
            let height = $(id).outerHeight();
            if(h) height -= 9;
            $('.card-item__focus').css('transform', 'translate('+ pos.left + 'px'  +','+ pos.top + 'px' +')').css('width', width + 'px').css("height", height + 'px').addClass('-active');
            clearInterval(inter);
        };
    }, 200);
}

function blu(){
    $('.card-item__focus').css('width', 100 + '%').css("height", 100 + '%').css('transform', 'translate(0px,0px)').removeClass('-active');
}

$('#cardCvv').focus(function() {
    $('.card-item').addClass('-active');
})

$('#cardCvv').blur(function() {
    $('.card-item').removeClass('-active');
})

$('#cardNumber, #cardName, #cardMonth, #cardYear').each(function() {
    $(this).blur(function() {
        blu();
    })
})

$('#cardNumber').focus(function() {
    foc('#numCard');
})

$('#cardName').focus(function() {
    foc('.card-item__info');
})

$('#cardMonth, #cardYear').each(function() {
    $(this).focus(function() {
        foc('.card-item__date', 1);
    })
})

let prev = '';
const r = /[A-я]/;
$("#cardNumber").on('input' ,function(e) {
    let val = $(this).val();
    val = val.replaceAll(r, '');
    $(this).val(val);
    let changes = [];
    for(let i = 0; i < prev.length; i++)
    {
        if(val[i] != prev[i]) changes.push(i);
    }
    if(changes.length != 0)
    {
        for(let i of changes) {
            if(i > val.length - 1) $('.card-item__number').children().eq(i).html('#');
            else $('.card-item__number').children().eq(i).html(val[i]);
        };
    }
    if(prev.length <= val.length)
    {
        for(let i = prev.length; i < val.length; i++)
        {
            $('.card-item__number').children().eq(i).css('opacity', 0);
            $('.card-item__number').children().eq(i).html(val[i]).animate({
                opacity: 1
            }, 250);
        }
    }
    prev = val;
    if(val[0] == 5 && $('.card-item__typeImg').eq(0).attr('src') != 'mastercard.png')
    {
        let i = $("<img style='transform: translateY(-25px); opacity: 0;' src='mastercard.png' class='card-item__typeImg' alt=''>");
        $('.card-item__typeImg').eq(0).replaceWith(i);
        $('.card-item__typeImg').eq(1).attr('src', 'mastercard.png');
        setTimeout(() => {
            i.css('opacity', 1).css('transform', 'translateY(0)');
        })
    }
    else if ($('.card-item__typeImg').eq(0).attr('src') != 'visa.png')
    {
        let i = $("<img style='transform: translateY(-25px); opacity: 0;' src='visa.png' class='card-item__typeImg' alt=''>");
        $('.card-item__typeImg').eq(0).replaceWith(i);
        $('.card-item__typeImg').eq(1).attr('src', 'visa.png');
        setTimeout(() => {
            i.css('opacity', 1).css('transform', 'translateY(0)');
        })
    }
})

console.log($('.card-item__typeImg').eq(0).attr('src'));

let n = '';
$('#cardName').on('input', function() {
    let val = $(this).val();
    let changes = [];
    for(let i = 0; i < n.length; i++)
    {
        if(val[i] != n[i]) changes.push(i);
    }
    if(changes.length != 0)
    {
        for(let i of changes) {
            if(i > val.length - 1) $('.letterHolder').eq(i).animate({
                bottom: -15,
                opacity: 0
            }, 60, function() {
                $(this).remove();
            });
            else $('.letterHolder').eq(i).html(val[i]);
        };
    }
    if(n.length <= val.length)
    {
        for(let i = n.length; i < val.length; i++)
        {
            let span = $("<span class='letterHolder'></span>").html(val[i]);
            if($('.fullName').length)
            {
                $('.fullName').replaceWith(span);
            }
            else
            {
                $('.card-item__info').append(span);
            }
            $(span).animate({
                bottom: 0,
                opacity: 1
            }, 60);
        }
    }
    n = val;
    if(val.length == 0) 
    {
        const name = $("<span class='fullName'>FULL NAME</span>");
        $('.card-item__info').append(name);
        $(name).animate({
            bottom: 0,
            opacity: 1
        }, 100);
    }
})

$("#cardMonth").change(function() {
    $('#cardMonthCard').html($(this).val());
})

$('#cardYear').change(function() {
    $('#cardYearCard').html($(this).val());
})

$('#cardCvv').on('input', function() {
    let val = $(this).val();
    val = val.replaceAll(r, '');
    $(this).val(val);
    $('.card-item__cvvBand span').html(val);
})