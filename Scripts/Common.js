///// <reference path="jquery-1.11.0.min.js" />
/// <reference path="jquery-3.5.1.min.js" />

function AddOnLoad(myFunction) {
    var oldFunction = $(document).ready;
    if (oldFunction != null) {
        $(document).ready(function () {
            oldFunction();
            myFunction();
        });
    }
    else {
        $(document).ready(function () {
            myFunction();
        });
    }
}
function GetMonthName(date, format) {
    try {
        var intMonth = date.getMonth();
    }
    catch (err) {
        alert("Invalid Date");
    }
    var strMonth;
    switch (intMonth) {
        case 0: strMonth = "January"; break;
        case 1: strMonth = "February"; break;
        case 2: strMonth = "March"; break;
        case 3: strMonth = "April"; break;
        case 4: strMonth = "May"; break;
        case 5: strMonth = "June"; break;
        case 6: strMonth = "July"; break;
        case 7: strMonth = "August"; break;
        case 8: strMonth = "September"; break;
        case 9: strMonth = "October"; break;
        case 10: strMonth = "November"; break;
        case 11: strMonth = "December"; break;
        default: strMonth = "";
    }
    if (format == "mm") {
        strMonth = strMonth.toUpperCase().substring(0, 3);
    }
    return strMonth;
}

function SetCookieValue(keyName, keyValue, expiryDate) {
    if (expiryDate == null || expiryDate == undefined) {
        var dateToday = new Date();
        dateToday.setFullYear(dateToday.getFullYear + 1);
        document.cookie = keyName + "=" + keyValue + ";expires=" + dateToday.toUTCString();
    }
    else { document.cookie = keyName + "=" + keyValue + ";expires=" + expiryDate.toUTCString(); }
}
function GetCookieValue(keyName) {
    var index, key, value, arrCookies = document.cookie.split(";");
    for (index = 0; index < arrCookies.length; index++) {
        key = arrCookies[index].substr(0, arrCookies[index].indexOf("="));
        value = arrCookies[index].substr(arrCookies[index].indexOf("=") + 1);
        key = key.replace(/^\s+|\s+$/g, "");
        if (key == keyName) {
            return value;
        }
    }
}
function CheckAll(control) {
    var checkAllSelector = '#' + control.id;
    var colIndex = $(checkAllSelector).parent().parent().children().index($(checkAllSelector).parent());
    $(checkAllSelector).parent().parent().parent().find("td:nth-child(" + (colIndex + 1) + ") :checkbox").each(function () {
        $(this).prop("checked", $(checkAllSelector).is(":checked") && !$(this).is(':disabled'));
    });
}
function CloseOnEscape() {
    $(document).keyup(function (e) {
        if (e.keyCode == 27)
            window.close();
    });
}
var hasChanged = false;
function TrackChanges(controlClass) {
    if (controlClass == null || controlClass == undefined) {
        controlClass = "input[type='text'], textarea, select";
    }

    $(controlClass).bind("change", function () { hasChanged = true; });

    $(window).bind("beforeunload", function () {
        if (hasChanged) {
            return "You have some on saved changes. Your changes will be lost.";
        }
    });
}
function IgnoreChanges() {
    hasChanged = false;
}
function SetDDLByValue(ddlSelector, value) {
    $(ddlSelector).find("option[value='" + value + "']").attr("selected", "selected");
}
function SetDDLByText(ddlSelector, text) {
    $(ddlSelector).find("option").filter(function () { return ($(this).text() == text); }).attr('selected', 'selected');
}
function SetDDLByIndex(ddlSelector, index) {
    $(ddlSelector).prop('selectedIndex', index);
}
function GetDDLSelectedValue(ddlSelector) {
    return $(ddlSelector).find("option:selected").val();
}
function GetDDLSelectedText(ddlSelector) {
    return $(ddlSelector).find("option:selected").text();
}
function GetDDLSelectedIndex(ddlSelector) {
    return $(ddlSelector).prop("selectedIndex");
}
function GetDDLSelectedCount(ddlSelector) {
    return $(ddlSelector).find("option:selected").length;
}
function GetLBSelectedCount(ddlSelector) {
    return $(ddlSelector).find("option:selected").length;
}
function GetLBSelectedIndex(ddlSelector) {
    var strIndex = "";
    $(ddlSelector).find("option:selected").each(function () {
        if (strIndex == "")
            strIndex = $(this).index();
        else
            strIndex = strIndex + "," + $(this).index();
    });
    return strIndex;
}
function GetLBSelectedValue(ddlSelector) {
    var strIndex = "";
    $(ddlSelector).find("option:selected").each(function () {
        if (strIndex == "")
            strIndex = $(this).val();
        else
            strIndex = strIndex + "," + $(this).val();
    });
    return strIndex;
}
function GetLBSelectedText(ddlSelector) {
    var strIndex = "";
    $(ddlSelector).find("option:selected").each(function () {
        if (strIndex == "")
            strIndex = $(this).text();
        else
            strIndex = strIndex + "," + $(this).text();
    });
    return strIndex;
}

function SetLBSelectedIndex(ddlSelector, strIndex) {
    strIndex = strIndex.toString();
    if (strIndex.length == 0 || strIndex == undefined)
        return;
    $(ddlSelector).find("option").attr("selected", false);
    if (strIndex.indexOf(',') > 0)
        $.each(strIndex.split(','), function () {
            $(ddlSelector).find("option").eq(this).attr("selected", "selected");
        });
    else
        $(ddlSelector).find("option").eq(strIndex).attr("selected", "selected");
}
function SetLBSelectedValue(ddlSelector, strIndex) {
    strIndex = strIndex.toString();
    if (strIndex.length == 0 || strIndex == undefined)
        return;
    $(ddlSelector).find("option").attr("selected", false);
    if (strIndex.indexOf(',') > 0)
        $.each(strIndex.split(','), function () {
            $(ddlSelector).find("option[value='" + this + "']").attr("selected", "selected");
        });
    else
        $(ddlSelector).find("option[value='" + strIndex + "']").attr("selected", "selected");
}
function SetLBSelectedText(ddlSelector, strIndex) {
    strIndex = strIndex.toString();
    if (strIndex.length == 0 || strIndex == undefined)
        return;
    $(ddlSelector).find("option").attr("selected", false);
    if (strIndex.indexOf(',') > 0)

        $.each(strIndex.split(','), function () {
            var strText = this;
            $(ddlSelector).find('option').filter(function () { return ($(this).text() == strText); }).attr('selected', 'selected');
        });
    else
        $(ddlSelector).find('option').filter(function () { return ($(this).text() == strIndex); }).attr('selected', 'selected');
}

function GoBack() {
    parent.history.back();
    return false;
}
/* Validations ***********************************************************************************/

//Class
function Validator() {
}

Validator.prototype.NewFunc = function () { }

Validator.IsBlank = function (value) {
    if ($.trim(value).length > 0) {
        return false;
    }
    else {
        return true;
    }
}

Validator.Trim = function (value) {
    return $.trim(value);
}

Validator.prototype.Validate = function (regExp, value) {
    if (Validator.IsBlank(value)) {
        return true;
    }
    return regExp.test(Validator.Trim(value));
}

Validator.IsInteger = function (value) {
    var regExp = /^[-]{0,1}\d{1,9}$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsNumeric = function (value) {
    var regExp = /^\d*$/;
    return (new Validator().Validate(regExp, value));
}

Validator.IsLongInteger = function (value) {
    var regExp = /^[-]{0,1}\d{1,10}$/;
    return (new Validator().Validate(regExp, value));
}

Validator.IsIntegerNotZero = function (value) {
    var regExp = /^(?:[1-9][0-9]*)$/;
    return (new Validator().Validate(regExp, value));
}

Validator.IsDecimal = function (value) {
    var regExp = /^\d*(\.\d+)?$/;
    return (new Validator().Validate(regExp, value));
}

Validator.IsEmail = function (value) {
    var regExp = /^[a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;
    return (new Validator().Validate(regExp, value));
}
// Add TAN Regular Expression 
Validator.IsTAN = function (value) {
    var regExp = /[A-Za-z]{4}[0-9]{5}[A-Za-z]{1}/;
    return (new Validator().Validate(regExp, value));
}

//Add Marks Regular expression
Validator.IsMarks = function (value) {
    var regExp = /^\d{1,4}(\.\d{0,2})?$/;
    return (new Validator().Validate(regExp, value));
}

Validator.IsValidNrID = function (value) {
    var regExp = /[N|n][R|r][0-9]{1,10}/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsValidRID = function (value) {
    var regExp = /[R|r][0-9]{1,10}/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsValidITICode = function (value) {
    var regExp = /(GR|PR|GU|PU|GSU|PSU|GSR|PSR|G |P |G |P |GS |PS |GS |PS )\d{8}|(CP|CG|C |C )\d{8}/;
    return (new Validator().Validate(regExp, value.toUpperCase()));
}
Validator.IsAlpha = function (value) {
    var regExp = /^[a-zA-Z ]+$/;
    return (new Validator().Validate(regExp, value));
}
//Added by Neha
Validator.IsAlphaWithComma = function (value) {
    var regExp = /^[a-zA-Z\, ]+$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsAlphaFormat = function (value) {
    var regExp = /^[a-zA-Z&%\-\+@#,\_ ]+$/;
    return (new Validator().Validate(regExp, value));
}

Validator.IsAlphaNumSpecail = function (value) {
    var regExp = /^[a-zA-Z0-9\-\.\_\#\@ ]+$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsName = function (value) {
    var regExp = /^[a-zA-Z\-\.\'\ ]+$/;
    return (new Validator().Validate(regExp, value));
}

Validator.IsAlphaNum = function (value) {
    var regExp = /^[a-zA-Z0-9]+$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsAlphaUserId = function (value) {
    var regExp = /^[a-zA-Z0-9*]+$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsAlphaSearch = function (value) {
    var regExp = /^[a-zA-Z*]+$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsAlphaSpace = function (value) {
    var regExp = /^([a-zA-Z]\s?)+(\s?[a-zA-Z]?)+$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsAlphaNumSpace = function (value) {
    var regExp = /^([a-zA-Z0-9]\s?)+$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsAlphaNumdot = function (value) {
    var regExp = /^[a-zA-Z0-9&\-\. ,]+$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsAlphaNumspecial = function (value) {
    var regExp = /^[0-9*]+$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsLineDelimNum = function (value) {
    var regExp = /^([0-9])+(([\n]){1}([0-9])+)*$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsCommaDelimNum = function (value) {
    var regExp = /^([0-9])+(([,]){1}([0-9])+)*$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsPhone = function (value) {
    var regExp = /^(\+){0,1}([0-9\-]){10,15}$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsMobile = function (value) {
    var regExp = /^([6-9]){1}([0-9]){9}$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsPincode = function (value) {
    var regExp = /^([1-9]){1}([0-9\-]){5}$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsTin = function (value) {
    var regExp = /^([1-9]){1}([0-9\-]){14}$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsAccountNo = function (value) {
    var regExp = /^\d{10,20}$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsFax = function (value) {
    var regExp = /^(\+){0,1}([0-9\-]){10,16}$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsCSNumber = function (value) {
    var regExp = /^([-\+0-9])+(([,]){1}([-\+0-9])+)*$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsPassword = function (value) {
    var regExp = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{7,20})$/;
    var regExp_1 = /([a-bA_B\D\d])\1{2}/;
    var boolHasRepeatedChar = new Validator().Validate(regExp_1, value);
    if (!boolHasRepeatedChar)
        return (new Validator().Validate(regExp, value));
    else
        return false;
}
Validator.IsAlphaNumSpaceSpecail = function (value) {
    var regExp = /^[a-zA-Z0-9\;\&\-\.\,\_\/\(\) ]+$/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsHTMLTag = function (value) {
    var regExp = /^<[^>]*>/;
    if (Validator.IsBlank(value))
        return false;
    else
        return (new Validator().Validate(regExp, value));
}

function daysInMonth(month, year) {
    var da = new Date(year, month + 1, 0);
    return da.getDate();
}

function leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

Validator.GetDate = function (dateString) {
    try {
        var month, year, date;
        var strMonth;
        year = parseInt(dateString.split("-")[2], 10);
        strMonth = dateString.split("-")[1].toUpperCase();
        date = parseInt(dateString.split("-")[0], 10);
        var isLeap = leapYear(year);
        if (strMonth == "FEB" && date > 29 && isLeap == true)
            return null;
        else if (strMonth == "FEB" && date > 28 && isLeap == false)
            return null;

        switch (strMonth) {
            case "JAN": month = 0; break;
            case "FEB": month = 1; break;
            case "MAR": month = 2; break;
            case "APR": month = 3; break;
            case "MAY": month = 4; break;
            case "JUN": month = 5; break;
            case "JUL": month = 6; break;
            case "AUG": month = 7; break;
            case "SEP": month = 8; break;
            case "OCT": month = 9; break;
            case "NOV": month = 10; break;
            case "DEC": month = 11; break;
            default: month = -1; break;
        }
        var days = daysInMonth(month, year);
        if (strMonth != "FEB" && date > days)
            return null;
        if (month == -1)
            return null;
        if (year >= 1000 && year <= 9999 && date >= 1 && date <= 31) {
            dtDate = new Date();
            dtDate.setYear(year);
            dtDate.setMonth(month);
            dtDate.setDate(date);
            return dtDate;
        }
        else
            return null;
    }
    catch (err) {
        return null;
    }
}
Validator.IsDate = function (value) {
    /* format DD-MMM-YYYY */
    if (Validator.IsBlank(value))
        return true;
    var dtDate = Validator.GetDate(value);

    if (dtDate == null) {
        return false;
    }
    else {
        return true;
    }
}
Validator.IsFutureDate = function (value) {
    if (!Validator.IsDate(value))
        return false;
    var date1 = new Date();
    var date2 = Validator.GetDate(value);
    if (Validator.DateDiffDate(date1, date2) < 0)
        return true;
    else
        return false;
}
Validator.IsPastDate = function (value) {
    if (!Validator.IsDate(value))
        return false;
    var date1 = new Date();
    var date2 = Validator.GetDate(value);
    if (Validator.DateDiffDate(date1, date2) > 0)
        return true;
    else
        return false;
}
Validator.IsDDLNotSelected = function (control) {
    return ($(control).prop("selectedIndex") == 0)
}
Validator.IsHTML = function (value) {
    try {
        var code = $(value);
        if ($(value).html().length == 0)
            return false;
        else
            return true;
    }
    catch (err)
    { return false; }
}
Validator.IsBadChar = function (value) {
    if (Validator.IsBlank(value))
        return false;
    var regExp = /[`|~|%|^|=|<|>|]+/;
    return (new Validator().Validate(regExp, value.toLowerCase()));
}

Validator.GetMonthName = function (date, format) {
    try {
        var intMonth = date.getMonth();
    }
    catch (err) {
        alert("Invalid Date");
    }
    var strMonth;
    switch (intMonth) {
        case 0: strMonth = "January"; break;
        case 1: strMonth = "February"; break;
        case 2: strMonth = "March"; break;
        case 3: strMonth = "April"; break;
        case 4: strMonth = "May"; break;
        case 5: strMonth = "June"; break;
        case 6: strMonth = "July"; break;
        case 7: strMonth = "August"; break;
        case 8: strMonth = "September"; break;
        case 9: strMonth = "October"; break;
        case 10: strMonth = "November"; break;
        case 11: strMonth = "December"; break;
        default: strMonth = "";
    }
    if (format = "mm") {
        strMonth = strMonth.toUpperCase().substring(0, 3);
    }
    return strMonth;
}
//Validator.CompareDate = function (dateString1, dateString2) {
//    var month, year, date;
//    year = dateString1.split("/")[2];
//    month = dateString1.split("/")[1];
//    date = dateString1.split("/")[0];

//    var intDateVal1 = (parseInt(year, 10) * 10000) + (parseInt(month, 10) * 100) + parseInt(date, 10);

//    year = dateString2.split("/")[2];
//    month = dateString2.split("/")[1];
//    date = dateString2.split("/")[0];

//    var intDateVal2 = (parseInt(year, 10) * 10000) + (parseInt(month, 10) * 100) + parseInt(date, 10);

//    if (intDateVal1 == intDateVal2) {
//        return 0;
//    }
//    else if (intDateVal1 < intDateVal2) {
//        return -1;
//    }
//    else {
//        return 1;
//    }
//}
Validator.DateDiff = function (dateString1, dateString2) {
    var date1 = Validator.GetDate(dateString1);
    var date2 = Validator.GetDate(dateString2);
    return ((date1 - date2) / (1000 * 60 * 60 * 24));
}
Validator.GetAge = function (dateString) {
    var date1 = Validator.GetDate(dateString);
    var date2 = new Date();
    var age = parseInt(((date2 - date1) / (1000 * 60 * 60 * 24)) / 365, 10);
    var noOfLeapDays = parseInt(age / 4);
    return parseInt((((date2 - date1) / (1000 * 60 * 60 * 24)) - noOfLeapDays) / 365, 10);
}
Validator.GetDaysFromToday = function (dateString) {
    var date1 = Validator.GetDate(dateString);
    var date2 = new Date();
    return parseInt(((date1 - date2) / (1000 * 60 * 60 * 24)), 10);
}
Validator.DateDiffDate = function (date1, date2) {
    return ((date1 - date2) / (1000 * 60 * 60 * 24));
}
Validator.IsIdName = function (value) {
    var regExp = /^[\d]+[-]{1}\w+/;
    if (Validator.IsBlank(value))
        return false;
    else
        return (new Validator().Validate(regExp, value));
}
//added by neha
Validator.IsYear = function (value) {
    var regExp = /(19|20)[0-9][0-9]/;
    return (new Validator().Validate(regExp, value));
}
Validator.IsGrade = function (value) {
    var regExp = /^[A-F]{1}[+]{0,1}/;
    return (new Validator().Validate(regExp, value.toUpperCase()));
}
Validator.IsPercentage = function (value) {
    var regExp = /^((0|[1-9]\d?)(\.\d{1,2})?|100(\.00?)?)$/;

    return (new Validator().Validate(regExp, value));
}
Validator.IsUID = function (value) {
    var regExp = /^\d{12}$/
    ///^([1-9]){1}([0-9\-]){5}$/;
    return (new Validator().Validate(regExp, value));
}
//added by neha ends
Validator.IsIFSC = function (value) {
    var regExp = /^[A-Z|a-z]{4}[0][A-Z|a-z|\d]{6}$/;
    return (new Validator().Validate(regExp, value));
}
Validator.GetFileExtention = function (value) {
    var index = value.toString().lastIndexOf(".");
    if (index <= 0)
        return null;
    return value.toString().substring(index + 1, value.toString().length).trim().toLowerCase();
}
Validator.IsImagePath = function (value) {
    var regExp = /[.]+(?:jpg||jpeg|gif|png)$/;
    return (new Validator().Validate(regExp, value.toLowerCase()));
}

Validator.IsAllowedDocument = function (value) {
    var regExp = /[.]+(?:jpg||jpeg|pdf)$/;
    return (new Validator().Validate(regExp, value.toLowerCase()));
}

Validator.IsAllowedQualificationDocument = function (value) {
    var regExp = /[.]+(?:docx|pdf|doc|jpg)$/;
    return (new Validator().Validate(regExp, value.toLowerCase()));
}
/* End Validations *******************************************************************************/

function Refresh() {
    window.location = window.location;
}
function SetUnselectable() {
    $('.unselectable, .unselectable *').each(function () {
        $(this).prop("unselectable", "on");
    });
}

Validator.CompareTwoDate = function (sDate, tDate) {
    if (!Validator.IsDate(sDate))
        return false;
    if (!Validator.IsDate(tDate))
        return false;
    var date1 = Validator.GetDate(sDate);
    var date2 = Validator.GetDate(tDate);
    if (Validator.DateDiffDate(date1, date2) > 0)
        return true;
    else
        return false;
}

Validator.IsNotZero = function (value) {
    var regExp = /^([0-9]*[1-9])/;
    return (new Validator().Validate(regExp, value));
}

Validator.IsValidCFICode = function (value) {
    var regExp = /(CG|CP)\d{8}/;
    return (new Validator().Validate(regExp, value.toUpperCase()));
}