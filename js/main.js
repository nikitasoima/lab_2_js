var 
    counter = 1
;

function Triangle(sideA, sideB, angele) {
    this.sideA = sideA;
    this.sideB = sideB;
    this.sideC = 0;
    this.angele = this.getRadians(angele);
}

Triangle.prototype.getThirdSide = function() {
    return Math.sqrt(Math.pow(this.sideA, 2) + Math.pow(this.sideB, 2) - 2 * this.sideA * this.sideB * Math.cos(this.angele)); 
};

Triangle.prototype.getRadians = function(_angle) {
    return (_angle * Math.PI) / 180;
};

Triangle.prototype.getDegr = function(_angle) {
    return (_angle * 180) / Math.PI;
};

Triangle.prototype.getAngels = function() {
    var
        angles = []        
    ;
    this.sideC = this.getThirdSide();

    angles[0] = this.getDegr(this.angele);
    angles[1] = this.getDegr(Math.acos((Math.pow(this.sideA, 2) + Math.pow(this.sideC, 2) - Math.pow(this.sideB, 2)) / (2 * this.sideA * this.sideC)));
    angles[2] = this.getDegr(Math.acos((Math.pow(this.sideB, 2) + Math.pow(this.sideC, 2) - Math.pow(this.sideA, 2)) / (2 * this.sideB * this.sideC)));
    return angles;
};

Triangle.prototype.getBisector = function() {
    var
        bisector = []        
    ;
    this.sideC = this.getThirdSide();

    bisector[0] = Math.sqrt((this.sideB * this.sideC * (this.sideB + this.sideC + this.sideA) * (this.sideB + this.sideC - this.sideA))) / (this.sideB + this.sideC);
    bisector[1] = Math.sqrt((this.sideA * this.sideC * (this.sideA + this.sideC + this.sideB) * (this.sideA + this.sideC - this.sideB))) / (this.sideA + this.sideC);
    bisector[2] = Math.sqrt((this.sideA * this.sideB * (this.sideA + this.sideB + this.sideC) * (this.sideA + this.sideB - this.sideC))) / (this.sideA + this.sideB);

    return bisector;
};

Triangle.prototype.getSidesByBisector = function() {
    var
        sides = []        
    ;
    this.sideC = this.getThirdSide();

    sides[0] = { 
        first: (this.sideA * this.sideC) / (this.sideA + this.sideB)
    }
    sides[0]['second'] =  this.sideC - sides[0]['first'];

    sides[1] = { 
        first: (this.sideA * this.sideB) / (this.sideA + this.sideC)
    }
    sides[1]['second'] =  this.sideB - sides[0]['first'];

    sides[2] = { 
        first: (this.sideC * this.sideA) / (this.sideA + this.sideC)
    }
    sides[2]['second'] = this.sideA - sides[0]['first'];

    return sides;
};

$(document).ready(function() {
    $('#addDynamicExtraFieldButton').click(function(event) {
        addDynamicExtraField();
        return false;
    });
     
    function addDynamicExtraField() {
        var div = $('<div/>', {
            'class': 'DynamicExtraField'
        }).appendTo($('#DynamicExtraFieldsContainer'));
        var hr = $('<hr>').appendTo(div);

        var input = $('<input/>', {
            id: 'sideA' + counter,
            type: 'number',
            placeholder: 'Сторона А:',
            'class': 'container'
        }).appendTo(div);

        input = $('<input/>', {
            id: 'sideB' + counter,
            type: 'number',
            placeholder: 'Сторона B:',
            'class': 'container'
        }).appendTo(div);

        input = $('<input/>', {
            id: 'angele' + counter,
            type: 'number',
            placeholder: 'Угол:',
            'class': 'container'
        }).appendTo(div);

        var br = $('<br/>').appendTo(div);
        var btn = $('<button/>', {
            text: 'Получить 3 угла',
            row: counter
        }).appendTo(div);

        btn.click(function() {
            var 
                btnId = this.getAttribute('row'),
                lenA = document.getElementById('sideA' + btnId).value,
                lenB = document.getElementById('sideB' + btnId).value,
                angele = document.getElementById('angele' + btnId).value,
                label = document.getElementById('label' + btnId),
                tr = new Triangle(lenA, lenB, angele),
                arrayAngels = tr.getAngels(),
                s = ""
            ;

            //валидацию alert('')

            for (var i = 0; i < arrayAngels.length; i++) {
                s += '<p> Угол ' + (i+1) + ' = ' + arrayAngels[i];
            }
            label.innerHTML = s;
            //$(this).parent().remove();

            return false;
        });

        btn = $('<button/>', {
            text: 'Увеличить угол',
            row: counter
        }).appendTo(div);

        btn.click(function() {
            var 
                btnId = this.getAttribute('row'),
                angele = document.getElementById('angele' + btnId),
                quantity
            ;

            quantity = prompt('Во сколько раз?');
            /*if(typeof quantity != 'number'){
                alert('Error');
                return false;
            } else {

            }*/

            angele.value *= quantity;
            return false;
        });

        btn = $('<button/>', {
            text: 'Уменшить угол',
            row: counter
        }).appendTo(div);

        btn.click(function() {
            var 
                btnId = this.getAttribute('row'),
                angele = document.getElementById('angele' + btnId),
                quantity
            ;

            quantity = prompt('Во сколько раз?');
            
            angele.value = angele.value / quantity;
            return false;
        });

        btn = $('<button/>', {
            text: 'Получить бисектрисы',
            row: counter
        }).appendTo(div);

        btn.click(function() {
            var 
                btnId = this.getAttribute('row'),
                lenA = document.getElementById('sideA' + btnId).value,
                lenB = document.getElementById('sideB' + btnId).value,
                angele = document.getElementById('angele' + btnId).value,
                label = document.getElementById('label' + btnId),
                tr = new Triangle(lenA, lenB, angele),
                arrayBis = tr.getBisector(),
                s = ""
            ;

            //валидацию alert('')

            for (var i = 0; i < arrayBis.length; i++) {
                s += '<p> Бисектриса ' + (i+1) + ' = ' + arrayBis[i];
            }
            label.innerHTML = s;

            return false;
        });

        btn = $('<button/>', {
            text: 'Получить отрезки, на которые бисектриса делит стороны',
            row: counter
        }).appendTo(div);

        btn.click(function() {
            var 
                btnId = this.getAttribute('row'),
                lenA = document.getElementById('sideA' + btnId).value,
                lenB = document.getElementById('sideB' + btnId).value,
                angele = document.getElementById('angele' + btnId).value,
                label = document.getElementById('label' + btnId),
                tr = new Triangle(lenA, lenB, angele),
                arrayPiece = tr.getSidesByBisector(),
                s = ""
            ;

            //валидацию alert('')
            for (var i = 0; i < arrayPiece.length; i++) {
                s += '<p> Сторона ' + (i+1) + ' = ' + arrayPiece[i].first + '(первый);   ' + arrayPiece[i].second + '(второй)';
            }
            label.innerHTML = s;

            return false;
        });

        var br = $('<br/>').appendTo(div);

        var label = $('<label/>', {
            text: '',
            id: 'label' + counter
        }).appendTo(div);

        var hr = $('<hr>').appendTo(div);

        counter++;
    }

    //Для удаления первого поля. если оно не динамическое
    $('.DeleteDynamicExtraField').click(function(event) {
        $(this).parent().remove();
        return false;
    });
});