////Function to change border color according to type change
//
//$('#add_type').on('change', function(){
//
//    let type = $('#add_type').val();
//
//    if(type == 'inc'){
//        $('.border_color').css("border-color", "#28B9B5");
//        $('.ion-ios-checkmark-outline').css("color", "#28B9B5");
//    }
//    else if( type == 'exp'){
//        $('.border_color').css("border-color", "#FF5049");
//        $('.ion-ios-checkmark-outline').css("color", "#FF5049");
//    }
//
//})
//
//
//$('#add_btn').on('click',function(){
//
//
//    let type = $('#add_type').val();
//
//    let desc = $('#desc').val();
//    let value = $('#value').val();
//    let budget = parseFloat($('#budget').html());
//    
//    
//    let incCount = $("div#income_list .item").length + 1;
//    let expCount = $("div#exp_list .item").length + 1;
//    
//
//    if(desc || value){
//        if(type == 'inc'){
//
//
//            let htm = "<div class='item clearfix' id='income-"+ incCount +"'>"
//            + "<div class='item__description'>"+ desc +"</div>"
//            + "<div class='right clearfix'>"
//            + "    <div class='item__value'>+ "+ value +"</div>"
//            + "    <div class='item__delete'>"
//            + "        <button class='item__delete--btn' onclick=deleteItem('income-"+ incCount +"')>"
//            + "            <i class='ion-ios-close-outline'></i>"
//            + "        </button>"
//            + "    </div>"
//            + "</div>"
//            + "</div>";
//
//            document.getElementById('income_list').insertAdjacentHTML('beforeend', htm);
//            
//            let tot = $('#income_total').html();
//            let added = parseFloat(tot) + parseFloat(value);
//            $('#income_total').html( added.toFixed(2));
//            
//            $('#budget').html((parseFloat(budget) + parseFloat(value)).toFixed(2));
//            
//               
//
//        }
//        else if( type == 'exp'){
//
//            let percentage = exPrecentage();
//            
//            let htm = "<div class='item clearfix' id='expense-"+ expCount +"'>"
//            + "<div class='item__description'>"+ desc +"</div>"
//            + "<div class='right clearfix'>"
//            + "    <div class='item__value'>- "+ value +"</div>"
//            + "     <div class='item__percentage'>"+ percentage +"%</div>"
//            + "    <div class='item__delete'>"
//            + "        <button class='item__delete--btn' onclick='deleteItem('expense-'"+ expCount +"')'>"
//            + "            <i class='ion-ios-close-outline'></i>"
//            + "        </button>"
//            + "    </div>"
//            + "</div>"
//            + "</div>";
//
//            document.getElementById('exp_list').insertAdjacentHTML('beforeend', htm);
//            
//            let tot = $('#exp_total').html();
//            let added = parseFloat(tot) + parseFloat(value);
//            $('#exp_total').html( added.toFixed(2));
//            
//            $('#budget').html((parseFloat(budget) - parseFloat(value)).toFixed(2));
//            
//        }
//        
//        $('#desc').val(null);
//        $('#value').val(null);
//    }
//
//})
//
//
//
//
//function exPrecentage(){
//    
//    let tot = parseFloat($('#income_total').html());
//    let value = $('#value').val();
//    let per = $('#exp_percent').html();
//    let cal = (value * 100)/tot;
//    $('#exp_percent').html((parseFloat(per) + cal).toFixed());
//    
//    return cal.toFixed();
//    
//    
//}
//
//
//function deleteItem(item){
//    
//    let val = $('#'+item +' .item__value').html();
//    
//    let price = val.split(' ')
////    alert(price[1]);
//    let budget = parseFloat($('#budget').html());
//    $('#budget').html((parseFloat(budget) - parseFloat(price[1])).toFixed(2));
//    
//    
//    $('#'+item).detach();
//    
//    
//    
//}
//
//
//


var inc =  new Array() ;
var exp  = new Array() ;
var income = 0;


class Income {
    constructor(id, desc , amount) {
        this.id = id;
        this.desc = desc;
        this.amount = amount;
    }
    show(){
        let htm = "<div class='item clearfix' id='income-"+ this.id +"'>"
        + "<div class='item__description'>"+ this.desc +"</div>"
        + "<div class='right clearfix'>"
        + "    <div class='item__value'>+ "+ parseFloat(this.amount).toFixed(2) +"</div>"
        + "    <div class='item__delete'>"
        + "        <button class='item__delete--btn' onclick=deleteItem('income-"+ this.id +"')>"
        + "            <i class='ion-ios-close-outline'></i>"
        + "        </button>"
        + "    </div>"
        + "</div>"
        + "</div>";

        document.getElementById('income_list').insertAdjacentHTML('beforeend', htm);
    }
}



class Expense {
    constructor(id, desc , amount) {
        this.id = id;
        this.desc = desc;
        this.amount = amount;
    }
    show() {
        let percentage = 0;
        percentage = (this.amount * 100)/income;

        let htm = "<div class='item clearfix' id='expense-"+ this.id +"'>"
        + "<div class='item__description'>"+ this.desc +"</div>"
        + "<div class='right clearfix'>"
        + "    <div class='item__value'>- "+ parseFloat(this.amount).toFixed(2) +"</div>"
        + "     <div class='item__percentage'>"+ parseFloat(percentage).toFixed() +"%</div>"
        + "    <div class='item__delete'>"
        + "        <button class='item__delete--btn' onclick='deleteItem('expense-"+ this.id +"')>"
        + "            <i class='ion-ios-close-outline'></i>"
        + "        </button>"
        + "    </div>"
        + "</div>"
        + "</div>";


        document.getElementById('exp_list').insertAdjacentHTML('beforeend', htm);
    }
}


function addItem() {

    let type = $('#add_type').val();
    let desc = $('#desc').val();
    let value = $('#value').val();


    //check if the values are empty
    if(desc || value){

        var newItem, ID;

        //[1 2 3 4 5], next ID = 6
        //[1 2 4 6 8], next ID = 9
        // ID = last ID + 1

        // Create new item based on 'inc' or 'exp' type
        if (type === 'exp') {

            //        alert('exp');

            if(exp.length > 0){
                ID = exp.length + 1;
            }
            else{
                ID = 0;
            }
            newItem = new Expense(ID, desc, value);
            exp.push(newItem);

        } else if (type === 'inc') {

            //        alert('inc');

            if(inc.length > 0){
                ID = exp.length + 1;
            }
            else{
                ID = 0;
            }
            newItem = new Income(ID, desc, value);
            inc.push(newItem);

        }


        displayList();
        $('#desc').val(null);
        $('#value').val(null);
    }
    else{

        alert("Please add values.");$('#desc').focus();
    }

}

function displayList(){   

    let budget = 0;
    income = 0;

    $('#income_list').empty();
    for(var i = 0 ; i<inc.length ; i++){

        budget = parseFloat(budget) + parseFloat(inc[i].amount);

        $('#budget').html(parseFloat(budget).toFixed(2));

        //    Assigning calculated budget to income
        income = parseFloat(budget) + parseFloat(income);
        $('#income_total').html( parseFloat(income).toFixed(2));

        //        Adding to html for display
        inc[i].show();
    } 


    let expense = 0;
    $('#exp_list').empty();
    for(var k = 0 ; k<exp.length ; k++){
        exp[k].show();

        expense = parseFloat(expense) + parseFloat(exp[k].amount);
        $('#exp_total').html( expense.toFixed(2));

        //calcuating expense percentage;
        let percentage = (expense * 100)/budget;

        //updating budget & percentage values
        $('#budget').html((parseFloat(budget) - parseFloat(expense)).toFixed(2));
        $('#exp_percent').html(parseFloat(percentage).toFixed());
    }



}


function deleteItem(item){

    let id = item.split(' ');

    alert(id[1]);


}



//Function to change border color according to type change

$('#add_type').on('change', function(){

    let type = $('#add_type').val();

    if( type == 'exp'){
        $('.border_color').addClass('red_focus');
        $('#add_btn').css("color" , "#FF5049");
    }
    else if( type == 'inc'){
        $('.border_color').removeClass('red_focus');
        $('#add_btn').css("color" , "#28B9B5");
    }

})












































