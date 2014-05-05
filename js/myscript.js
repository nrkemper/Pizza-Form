/*************************************************************/
/* Name : Nick Kemp                                          */
/* login : int222_131b07                                     */
/*************************************************************/

/****************************************************************************/
/*              This function calculates the pizza price                    */
/****************************************************************************/
function calculatePizzaPrice(){

   var priceList    = new Array(0.00, 11.55, 15.25, 22.00, 25.00); // The price for the different sizes

   var HST          = 0.13;                                        // HST current rate
   var TOPPING      = 1.79;                                        // Cost of each topping - First two are free

   var sizePrice    = 0, toppingCount = 0, toppingCost  = 0;
   var subTotal     = 0, hst          = 0, finalTotal   = 0;

   var whichSize    = 0;

   whichSize = document.onlineOrder.pizzaSize.selectedIndex;      // Get the pizza size they selected

   if (whichSize > 0) {                                           // They selected a valid pizza size
      sizePrice = priceList[whichSize];
   }
   else { 
      sizePrice = 0;                                              // They did not select a pizza size
   }

   // Determine the number of toppings if any 


   for (var i = 0; i < 12;i++){                                       
       if (document.onlineOrder.toppings[i].checked == true)     // check and count how many toppings
          toppingCount++;  
   }

   if (toppingCount < 3) toppingCount=0; else toppingCount=toppingCount-2; // The first 2 are free
   
   // Pizza price calculation based on what they selected


   toppingCost = Math.floor(((1.79 * toppingCount) + 0.005)*100); toppingCost = toppingCost /100;
   subTotal    = Math.floor(((sizePrice + toppingCost) + 0.005)*100);subTotal = subTotal /100;
   hst         = Math.floor((((subTotal * HST) + 0.005)*100));hst = hst/100;  // HST calculation

   finalTotal = (subTotal + hst).toFixed(2);


   // Results from store calculation

   document.onlineOrder.hPizzaPrice.value     = sizePrice;
   document.onlineOrder.hToppings.value       = toppingCount;
   document.onlineOrder.hToppingsCost.value   = toppingCost;
   document.onlineOrder.hSubTotal.value       = subTotal;
   document.onlineOrder.hHst.value            = hst;
   document.onlineOrder.hFinalTotal.value     = finalTotal;
   document.onlineOrder.price.value           = "$ " + finalTotal; // update price on the form

} // End of calculatePizzaPrice function


/****************************************************************************/
/*         You are not allowed to change any of the above function.         */
/****************************************************************************/

/****************************************************************************/
/*                  Your JavaScript starts here                             */
/*                                                                          */
/****************************************************************************/
/****************************************************************************/
/* Function Description                                                     */
/*                                                                          */
/*                                                                          */
/*                                                                          */
/*                                                                          */
/****************************************************************************/
 function validateOrder() {
  var errors="";
  var Client_PhoneErrors="";
  errors = validateSurname(errors);
  Client_PhoneErrors = validateClient(Client_PhoneErrors);
  Client_PhoneErrors = validatePhone(Client_PhoneErrors);
  if(Client_PhoneErrors == ""){
    Client_PhoneErrors = Client_Phone(Client_PhoneErrors);
  }
  errors += Client_PhoneErrors;
  errors = validateDOB(errors);
  errors = validatePizzaSize(errors);
  errors = validatePizzaCrust(errors);
  errors = validateCheese(errors);
  errors = validateSauce(errors);
  if(errors==""){
    document.onlineOrder.surname.value = document.onlineOrder.surname.value.charAt(0).toUpperCase() + document.onlineOrder.surname.value.substr(1);
    document.onlineOrder.hJsActive.value = "Y";
    alert( document.onlineOrder.hJsActive.value);
    calculatePizzaPrice();
    return true;
  }
  else{
    showErrors(errors);
    return false;
  }
 }

 function validateSurname(errors){
   var surname=document.onlineOrder.surname.value;//could be a duplicate
   var length = surname.length;
   var i=0;
   var valid=1;
   var temperr = "";
   var numOfHyphens=0;
   var numOfApos=0;
   var hyphenNexttoApos=0;
   var invalidHyphen=0;
   var invalidApos=0;
   if(length == 0){
     temperr += "<tr><td>&nbsp;&nbsp;- Cannot be blank</td></tr>";
   }
   else if(length<4){
     temperr += "<tr><td>&nbsp;&nbsp;- Cannot be less than 4 characters</td></tr>";
   }
   else if(length > 15){
     temperr += "<tr><td>&nbsp;&nbsp;- Cannot be greater than 15 characters</td></tr>";
   }
   /*else{*/ 
     var upperSurname = surname.toUpperCase();
   
     for(i;i<length;i++){
       if(upperSurname.charCodeAt(i) == 39){
         if(i==0 || i == (length-1)){
           invalidApos=1;
         }
         else if(upperSurname.charCodeAt(i-1) == 45){
           hyphenNexttoApos=1;
         }
         else{
           numOfApos++;
         }
       }
       else if(upperSurname.charCodeAt(i) == 45){
         if(i==0 || i==(length-1)){
           invalidHyphen=1;
         }
         else if(upperSurname.charCodeAt(i-1) == 39){
           hyphenNexttoApos=1;
         }
         else{
           numOfHyphens++; 
         }
       }
       else if(upperSurname.charCodeAt(i) < 65 || upperSurname.charCodeAt(i) > 90){
         valid=0;
       }
     }
     if(!valid){
       temperr += "<tr><td>&nbsp;&nbsp;- Only letters will be accepted. Hyphens and apostrophes will be accepted too aslong as they are within the name.</td></tr>";
     }
     
     if(invalidHyphen){
       temperr += "<tr><td>&nbsp;&nbsp;- A hyphen CANNOT be at the beginning or end of a name</td></tr>";
     }
  
     if(invalidApos){
       temperr += "<tr><td>&nbsp;&nbsp;- An apostrophe CANNOT be at the beginning or end of a name</td></tr>";
     }
  
     if(numOfApos>1){
       temperr += "<tr><td>&nbsp;&nbsp;- Too many apostrophes</td></tr>";
     }

     if(numOfHyphens>1){
       temperr += "<tr><td>&nbsp;&nbsp;- Too many hyphens</td></tr>";
     }
 
     if(hyphenNexttoApos){
       temperr += "<tr><td>&nbsp;&nbsp;- CANNOT have a hyphen next to an apostrophe</td></tr>";
     }
   /*}
*/
   if(temperr!=""){
     errors += "<tr><td class='errorType'>INVALID NAME</td></tr>"
     errors += temperr;
   }
   return errors;  
 }

 function validateClient(errors){
   var client = document.onlineOrder.client.value;//could be a duplicate
   var length = client.length;
   var i=0;
   var valid=1;
   var temperr="";
   if(length==0){
     temperr += "<tr><td>&nbsp;&nbsp;- Cannot be blank</td></tr>";     
   }
   else if(length != 12){
     temperr += "<tr><td>&nbsp;&nbsp;- Has to be 12 characters</td></tr>"; 
   }
   else{
     for(i;i<length;i++){
       i==7?i++:i;//skips pos 7
       if(client.charCodeAt(i) > 57 || client.charCodeAt(i) < 48){
         valid=0;
       }
     }

     var beg = client.substr(0,3);//test to make your you just get the first 3
     if(beg!= "416" && beg!= "905" && beg!="647"){  //watch this if statement
       temperr += "<tr><td>&nbsp;&nbsp;- First 3 numbers have to be 416, 905, or 647</td></tr>";
     }

     if(client.charCodeAt(7)!= 45){//validates hyphen in pos 7
       temperr += "<tr><td>&nbsp;&nbsp;- Has to have a hyphen at the 8th character</td></tr>";
     }
     var diff1= client.charCodeAt(3) - client.charCodeAt(9);
     diff1 = diff1 < 0 ? diff1 * (-1) : diff1; 
     var diff2= client.charCodeAt(2) - 48;
     if(diff1 != diff2){
       temperr += "<tr><td>&nbsp;&nbsp;- Pos4 minus pos10 has to equal position 3</td></tr>";
     } 
  
     var sum1=0;//positions 3+4+5+6
     var sum2=0;//positions 8+9+10+11

     //adds positions 3-6 inclusive
     for(i=3;i<=6;i++){
       sum1+=client.charCodeAt(i);
     }


     //adds positions 8-11 inclusive
     for(i=8;i<=11;i++){
       sum2+=client.charCodeAt(i);
     }

     if(sum1 < sum2){//(3+4+5+6) > (8+9+10+11)
     temperr += "<tr><td>&nbsp;&nbsp;- the sum of positions 3,4,5,6 have to equal the sum of positions 8,9,10,11</td></tr>";
     }
   }
   
   if(temperr!=""){
     errors += "<tr><td class='errorType'>INVALID ACCOUNT#</td></tr>";
     errors += temperr;
     errors += "<tr><td>For example: 4162892-3833</td></tr>";
   } 
   return errors;;
 }

 function validatePhone(errors){
   //416     649       2341
   //|_|     |_|       |__|
   // |       |         |
//  area   exchange     phone num
//  code
// RULES:
//   1) Must be 12 characters in length
//   2) Everything numeric
//   3) allowable area codes have to be 416 905 or 647
//   4) the area code must match the first three digits in the account #
//   5) the exchange must be a multiple of 3 from 203 - 419
//   6) the phone number cant be all zeros
  var phoneNum = document.onlineOrder.phone.value;
  var length = phoneNum.length;
  var i=0;
  var valid =1;
  var areaCode = phoneNum.substr(0,3);
  var c_exchange = phoneNum.substr(4,3);//char version of the exchange
  var exchange =0;
  var exp=0;
  var temperr="";
  if(length == 0){
    temperr += "<tr><td>&nbsp;&nbsp;- Cannot be blank</td></tr>";
  }
  else if(length<12){
    temperr += "<tr><td>&nbsp;&nbsp;- Too short. Has to be 12 characters in length</td></tr>";
  }
  else if(length > 12){
    temperr += "<tr><td>&nbsp;&nbsp;- Too long. Has to be 12 characters in length</td></tr>";
  }
  else{
    for(i;i<12;i++){
      if(i!=3 && i!=7){
        if(phoneNum.charCodeAt(i) < 48 || phoneNum.charCodeAt(i) > 57){
          valid=0;
        }
      }
      else{
        if(phoneNum.charCodeAt(i) != 45){
          valid=-1;
        }
      }
    }
  
    if(valid==0){
      temperr += "<tr><td>&nbsp;&nbsp;- invalid characters</td></tr>";
    }
    else if(valid==-1){
      temperr += "<tr><td>&nbsp;&nbsp;- have to have spaces in between groups of numbers</td></tr>";
    }
  
    if(areaCode != "416" && areaCode != "905" && areaCode != "647"){
      temperr += "<tr><td>&nbsp;&nbsp;- the area code has to be either 416,905 or 647</td></tr>";
    }
 
    //converts the exchange to numeric
    exchange = convert(c_exchange);

    if((exchange-200)%3 != 0){
      temperr += "<tr><td>&nbsp;&nbsp;- the exchange has to be a multiple of 3</td></tr>";
    }
  
    if(exchange < 203 || exchange > 419){
      temperr += "<tr><td>&nbsp;&nbsp;- the exchange has to be in between 203 and 419 inclusive</td></tr>";
    }

    if(phoneNum.substr(8) == "0000"){
      temperr += "<tr><td>&nbsp;&nbsp;- the last 4 digits CANNOT be 0000</td></tr>";
    }
  }
  
  if(temperr != ""){
    errors += "<tr><td class='errorType'>INVALID PHONE NUMBER</td</tr>";
    errors += temperr;
    errors += "<tr><td>For example: 416-203-1234</td></tr>";
  }
  return errors;
 }

 function convert(str){
   var length=str.length;
   var exp=length - 1;
   var num=0;
   for(var i=0;i<length;i++){
     num += (str.charCodeAt(i) - 48)*Math.pow(10,exp);
     exp--;
   }
   return num;
 }

 function Client_Phone(errors){
  var client = document.onlineOrder.client.value.substr(0,3);
  var phoneNum = document.onlineOrder.phone.value.substr(0,3);

  if(client!=phoneNum){
    errors += "<tr><td>&nbsp;&nbsp;- first three digits in your account number must match the area code in your phone number</td></tr>";
  }
    return errors;
 }

 function validateDOB(errors){
   var DOB = document.onlineOrder.dob.value;
   var DOB_upper = DOB.toUpperCase();
   var DOB_year_c = DOB.substr(3);
   var DOB_year = convert(DOB_year_c);
   var length=DOB.length;
   var months=new Array("JAN", "FEB", "MAR","APR", "MAY","JUN", "JUL", "AUG","SEP","OCT", "NOV","DEC");
   var temperr="";
   var i=0;
   var valid=1;
   var upperCase = 0;
   var Year = new Date();
   Year = Year.getFullYear();
   if(length == 0){
     temperr += "<tr><td>&nbsp;&nbsp;- Cannot be blank</td></tr>";
   }
   else if(length<7){
     temperr += "<tr><td>&nbsp;&nbsp;- Too short. Has to be 7 characters in length</td></tr>";
   }
   else if(length > 7){
     temperr += "<tr><td>&nbsp;&nbsp;- Too long. Has to be 7 characters in length</td></tr>";
   }
   else{
     for(i=0;i<3;i++){//validates that the first 3 characters are letters
       if(DOB_upper.charCodeAt(i) > 90 || DOB_upper.charCodeAt(i) < 65){
         valid=0;
       }
     }  
 
     for(i=3;i<7;i++){//validates that the last 4 characters are numbers
       if(DOB.charCodeAt(i) > 57 || DOB.charCodeAt(i) < 48){
         valid=0;
       }
     }
    
     if(!valid){
       temperr += "<tr><td>&nbsp;&nbsp;- Incorrect characters</td></tr>";
     }
     else{  
       if(DOB.charCodeAt(0)>=65 && DOB.charCodeAt(0) <=90){//finds the case of the first character
         upperCase=1;
       }
   
       for(i=0;i<3;i++){//validates that all the characters are the same
         if(upperCase){
           if(!(DOB.charCodeAt(i)>=65 && DOB.charCodeAt(i) <=90)){//if the character isnt uppercase
             valid=0;
           }
         }
         else{
           if(!(DOB.charCodeAt(i)>=97 && DOB.charCodeAt(i) <=122)){
             valid=0;
           }
         }
       }
   
       if(!valid){
         temperr += "<tr><td>&nbsp;&nbsp;- Letters in the month can either be ALL uppercase or ALL lowercase. Cannot be a mixture of both</td></tr>";
       }
     }
  
     valid=0;
         
     for(i=0;i<12;i++){//validates that the user entered a correct month
       if(DOB_upper.substr(0,3) == months[i]){
         valid=1;
       }
     }
  
     if(!valid){
       temperr += "<tr><td>&nbsp;&nbsp;- Not a valid month</td></tr>";
     }
   
   }

   if((Year - DOB_year) <  18){
     temperr += "<tr><td>&nbsp;&nbsp;- You must be 18 years old to order</td></tr>";
   }
   if(temperr!=""){
     errors += "<tr><td class='errorType'>INVALID DATE OF BIRTH</td></tr>";
     errors += temperr;
     errors += "<tr><td>For example: DEC1990</td></tr>";
   }
   return errors;
 }

 function validatePizzaSize(errors){
   if(document.onlineOrder.pizzaSize.selectedIndex < 1){
     errors += "<tr><td class='errorType'>INVALID PIZZA SIZE</td></tr>";
     errors += "<tr><td>&nbsp;&nbsp;- Please select a size<br/></td></tr>";
   }   

   return errors;
 }

 function validatePizzaCrust(errors){
   if(document.onlineOrder.pizzaCrust.selectedIndex < 0){
     errors += "<tr><td class='errorType'>INVALID CRUST TYPE</td></tr>";
     errors += "<tr><td>&nbsp;&nbsp;- Please select the type of crust<br/></td></tr>";
   }

   return errors;
 }

 function validateCheese(errors){
   var i;
   var valid = 0;
   for(i=0;i<3;i++){
     if(document.onlineOrder.cheese[i].checked){
       valid=1;
     }
   }
   if(!valid){
     errors += "<tr><td class='errorType'>INVALID TYPE OF CHEESE</td></tr>";
     errors += "<tr><td>&nbsp;&nbsp;- Please select a type of cheese<br/></td></tr>";
   }
  
   return errors;
 }

 function validateSauce(errors){
   var i;
   var valid =0;
   for(i=0;i<3;i++){
     if(document.onlineOrder.sauce[i].checked){
       valid=1;
     }
   }
   if(!valid){
     errors += "<tr><td class='errorType'>INVALID TYPE OF SAUCE</td></tr>";
     errors += "<tr><td>&nbsp;&nbsp;- Please select a type of sauce</td></tr>";
   }

   return errors;
 }


 function showErrors(errors){
   errors = "<table class='errorTable' id='errorTable'>" + errors + "</table>";
   document.getElementById("errors").innerHTML = errors;
 }

