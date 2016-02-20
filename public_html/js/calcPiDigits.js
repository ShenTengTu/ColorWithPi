/*
This is the code using "Machin Formula" for Calculating PI and getting its digits.
Machin Formula: Pi/4 = 4*arctan(1/5)-arctan(1/239)
Call the Function calcPiDigits (nDigits) and it will return an Array of Digits.

The original code is written by Ken Ward.
http://www.trans4mind.com/personal_development/JavaScript/longnumPiMachin.htm

Edited by ShenTeng Tu
*/

Base=Math.pow(10,11);
cellSize=Math.floor(Math.log(Base)/Math.LN10);//num digits in each array item


    function makeArray (n, aX, Integer) {

        var i=0;
        for (i=1; i<n; i++)
            aX[i] = null;

        aX[0] = Integer;

    }

    function isEmpty (aX) {

        var empty=true;
        for (i=0; i<aX.length; i++)
            if (aX[i]){
            empty= false;
            break;
            }

        return empty;

    }

    function Add (n, aX,aY) {

        carry=0;
        for (i=n-1; i>=0; i--) {
            aX[i] += Number(aY[i])+Number(carry);

            if (aX[i]<Base)
                carry = 0;
            else {
                carry = 1;
                aX[i] =Number(aX[i])- Number(Base);
            }
        }

    }

    function Sub (n, aX,aY) {

        for (i=n-1; i>=0; i--) {
            aX[i] -= aY[i];
            if (aX[i]<0) {
                if (i>0) {
                    aX[i] += Base;
                    aX[i-1]--;
                }
            }
        }

    }

    function Mul (n, aX, iMult) {

        carry=0;
        for (i=n-1; i>=0; i--) {

            prod = (aX[i])*iMult;
            prod += carry;
            if (prod>=Base) {
                carry = Math.floor(prod/Base);
                prod -= (carry*Base);
            }
            else
                carry = 0;

            aX[i] = prod;
        }

    }

    function Div (n, aX, iDiv,aY) {

        carry=0;
        for (i=0; i<n; i++) {

            currVal = Number(aX[i])+Number(carry*Base);//add any previous carry
            theDiv =Math.floor(currVal/iDiv);//divide
            carry = currVal-theDiv*iDiv;//find next carry
            aY[i] = theDiv;//put the result of division in the current slot
        }

    }

    function arctan (iAng, n, aX) {
        //arctan(x)= x - (x^3/3) + (x^5/5) - (x^7/7) + (x^9/9) ...
        iAng_squared=iAng*iAng;
        k=3; //k is the coefficient in the series 2n-1, 3,5..
        sign=0;
        
        makeArray (n, aX, 0); //aX is aArctan
        makeArray (n, aAngle, 1);
        Div (n, aAngle, iAng, aAngle); //aAngle = 1/iAng, eg 1/5
        Add (n, aX, aAngle); // aX = aAngle or long angle

        while (!isEmpty(aAngle)) {

            Div (n, aAngle, iAng_squared, aAngle); //aAngle=aAngle/iAng_squared, iAng_squared is iAng*iAng
            Div (n, aAngle, k, aDivK); /* aDivK = aAngle/k */

            if (sign)
                Add (n, aX, aDivK); /* aX = aX+aDivK */
            else 
                Sub (n, aX, aDivK); /* aX = aX-aDivK */

            k+=2;
            sign = 1-sign;
        }

    }

function calcPiDigits (nDigits) {
    //Machin: Pi/4 = 4*arctan(1/5)-arctan(1/239)
    nDigits=Number(nDigits);
    arrayLength=Math.ceil((nDigits+5)/cellSize+1);
    arctanParam=[5,239,0];//Parameter in arctan()
    coeff=[4,-1,0];//Coefficient

    aPI = new Array(arrayLength);
    makeArray (arrayLength, aPI, 0);

    aAngle=new Array(arrayLength);
    makeArray(arrayLength,aAngle,0);

    aDivK=new Array(arrayLength);
    makeArray(arrayLength,aDivK,0);

    aArctan = new Array(arrayLength);

    //Machin: Pi/4 = 4*arctan(1/5)-arctan(1/239)
    for (var i=0; coeff[i]!==0; i++) {

        arctan(arctanParam[i], arrayLength, aArctan);
        Mul (arrayLength, aArctan, Math.abs(coeff[i]));

        if (coeff[i]>0)
            Add (arrayLength, aPI, aArctan);
        else
            Sub (arrayLength, aPI, aArctan);

    }
    Mul (arrayLength, aPI, 4);
    
    strPI=String(aPI);
    var result=new Array(nDigits);
    var cStr=2;
    var cReSult=0;
    while(cReSult<nDigits){
        if(strPI.charAt (cStr)!==","){
            result[cReSult]=strPI.charAt (cStr);
            cReSult++;
        }
        cStr++;
    }

return result;
}


