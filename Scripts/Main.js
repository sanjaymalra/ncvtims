///// <reference path="jquery-1.11.0.min.js" />
/// <reference path="jquery-3.5.1.min.js" />
/// <reference path="Common.js" />

AddOnLoad(SetExportLink);
AddOnLoad(SetAccordian);
AddOnLoad(SetNew);
AddOnLoad(EnableKeyCheck);
AddOnLoad(DisableTags);
AddOnLoad(RestoreScrollPosition);
AddOnLoad(DisableEmptyMenu);
//AddOnLoad(ToggleMobile);

function OnEachCallBack() {
    SetToolTip();
    SetDatePicker();
    SetAccordian();
    EnableScrollSave();
    SetUnselectable();
    EnableGridClickSelect();
    EnableCheckOne();
    SetOverflow();
    SetTextAreaMax();//Set maxlength of textarea
    SetPreview();
    SetRatingControl();
    //BlockRatingControl();
    SetWarningonExternalLinks();
}

function DisableEmptyMenu() {
    $(".menu ul li a").each(function () {
        if ($(this).attr("href") == "#") {
            $(this).removeAttr("onclick");
            $(this).bind("click", function () { return false; });
        }
    });
}
function ToggleMobile() {
    if ($(window).innerWidth() < 1000) {
        $("body").removeClass("desktop");
        $("body").addClass("mobile");
    }
    $(window).resize(function () { ToggleMobile(); });
}
function SetExportLink() {
    $(".export_link").each(function () {
        $(this).click(function () {
            $(this).find("ul").stop().show(200);
        });
        $(this).hover(function () {
            $(this).find("ul").stop().show(200);
        });
        $(this).mouseleave(function () {
            $(this).find("ul").stop().hide(200);
        });
    });
}
function SetAccordian() {
    $(".accordian h2").unbind("click").click(function () {
        $(this).siblings(0).slideToggle(200);
    });

    $(".accordian").each(function () {
        if ($(this).hasClass("min"))
            $(this).find("h2").siblings(0).hide();
    });
}
function HideAccordian(index) {
    $(".accordian").eq(index).find("h2").siblings(0).hide(500);
}
function SetNew() {
    $("a.new").each(function () {
        if ($(this).find("sup").length == 0)
            $(this).append("<sup>new</sup>");
    });
}
function SetDatePicker() {
    $(".date").each(function () {
        //$(this).attr("readonly", true);
        $(this).datepicker({
            dateFormat: 'dd-M-yy',
            changeMonth: true,
            changeYear: true,
            yearRange: "-50:+0"
        });
        $(this).prop("size", 10);
        if ($(this).parent().find(".format").length == 0)
            $(this).parent().append("<span class='format'>dd-mmm-yyyy</span>");
    });
}
function SetWarningonExternalLinks() {
    $("a.external").each(function () {
        if ($(this).attr('href').toLowerCase().indexOf(".gov.in") < 0)  //non goverment site
            $(this).click(function () { return window.confirm('This link will take you to an external non goverment website. Are you sure you want to continue?'); });
        else
            $(this).click(function () { return window.confirm('This link will take you to an external website. Are you sure you want to continue?'); });
    });
}
function EnableKeyCheck() {
    $(document).keydown(function (e) {
        if (e.keyCode == 116) { //F5 - disable event firing on refresh
            e.preventDefault();
            var location = window.location.toString();
            if (location.indexOf("#") == (location.length - 1))
                location = location.substring(0, location.indexOf("#"));
            window.location = location;
        }
        else if (e.keyCode == 27) { //Escape - Hide all overlays are escape press
            HideBanner();
            HideConfirm();
            HideOverlay();
        }
    });
}
function CloseOnEscape() {
    $(document).keydown(function (e) {
        if (e.keyCode == 27) { //Escape - closes window
            window.close();
        }
    });
}
function RedirectOpenerClose(url) {
    window.opener.location = url;
    window.close();
}
function DisableTags() {
    $(document).on('focus', 'input[type=text]', function () {
        $(this).attr('autocomplete', 'off');
    });
    $("input[type=text], textarea, input[type=file]").each(function () {
        $(this).bind("change", function (e) {
            if (Validator.IsHTMLTag($(this).val())) {
                alert("HTML Tags are not allowed as inputs.");
                $(this).val("");
                $(this).focus();
            }
            else if (Validator.IsBadChar($(this).val())) {
                alert("Some special characters are not allowed as inputs.");
                $(this).val("");
                $(this).focus();
            }
        });
    });
}

function RefreshPage(noQS) {
    if (noQS == true)
        window.location = window.location.toString().split("?")[0].split("#")[0]
    else
        window.location = window.location;
    return false;
}

/*Message & Error Handling */
var bannerError = "error";
var bannerSuccess = "success";
var bannerWarning = "warn";
var arrMessage = new Array();
var arrToolTip = new Array();

var onEachLoad = "";
function ShowToolTip(message) {
    $("#tooltip").html(message);
}
function HideToolTip() {
    $("#tooltip").html("");
}
function SetToolTip() {
    try {
        var onEachLoad = "$('#body').hover(function () {HideToolTip();} );";
        for (var index = 0; index < arrToolTip.length; index++) {
            var selector = arrToolTip[index].split("^")[0];
            var message = arrToolTip[index].split("^")[1];
            onEachLoad = onEachLoad + "$('" + selector + "').focus(function () { ShowToolTip('" + message + "') });";
            onEachLoad = onEachLoad + "$('" + selector + "').hover(function () { ShowToolTip('" + message + "') });";
        }
        $(".grid .header th").each(function () {
            $(this).hover(function () { ShowToolTip($(this).prop("abbr")); });
        });
        eval(onEachLoad);
    }
    catch (err) {
        alert(err);
    }
}
function HasError() {
    if (arrMessage.length > 0) return true;
    else return false;
}
function AddToolTip(selector, message) {
    var toolTip = selector + '^' + message.toString().replace("'", "");
    var index = $.inArray(toolTip, arrToolTip);
    if (~index) arrToolTip.splice(index, 1);
    if (arrToolTip.length >= 100) arrToolTip.shift();
    arrToolTip[arrToolTip.length] = toolTip;
}

function RemoveMessage(message) {
    var index = $.inArray(message, arrMessage);
    if (~index) arrMessage.splice(index, 1);
}
function ClearMessage() {
    arrMessage = new Array();
}
function AddMessage(message) {
    var index = $.inArray(message, arrMessage);
    if (~index) arrMessage.splice(index, 1);
    if (arrMessage.length >= 100) arrMessage.shift();
    arrMessage[arrMessage.length] = message;
}
function MarkBad(selector) {
    $(selector).addClass("bad");
    $(selector).focus(function () { $(this).removeClass("bad") });
    $(selector).click(function () { $(this).removeClass("bad") });
    //$(document).scrollTop($(selector).offset().top-200);
}
function ClearBad() {
    $(".bad").removeClass("bad");
}

function CheckMandatory(group) {
    var selector = ".required";
    if (!Validator.IsBlank(group))
        selector = "." + group;
    else
        selector = ".required";

    $(selector).each(function () {
        var hasError = false;

        if ($(this).is(":visible") && $(this).is(":enabled")) {
            if (($(this).prop("type") == "text" || $(this).prop("type") == "textarea" || $(this).prop("type") == "password") && Validator.IsBlank($(this).val())) hasError = true;
            if (($(this).prop("type") == "select-one") && $(this).prop("selectedIndex") <= 0) hasError = true;
            if ($(this).prop("type") == "select-multiple" && $(this).prop("selectedIndex") <= 0) hasError = true;
            if ($(this).prop("type") == "file" && $(this).val().length == 0) hasError = true;
            if (hasError) {
                AddErrorMessage($(this), "is a mandatory field.");
            }
            else { RemoveMessage("<b>" + $(this).prop("title") + "</b> is a mandatory field."); }
        }
    });
}
function CheckOneMandatory(group) {
    selector = "." + group + ", ." + group + " :checkbox" + ", ." + group + " :radio";
    var hasFilled = false;
    $(selector).each(function () {
        if ($(this).is(":visible") && $(this).is(":enabled")) {
            if (($(this).prop("type") == "text" || $(this).prop("type") == "textarea" || $(this).prop("type") == "password") && Validator.IsBlank($(this).val()) == false) hasFilled = true;
            if (($(this).prop("type") == "select-one") && $(this).prop("selectedIndex") > 0) hasFilled = true;
            if ($(this).prop("type") == "select-multiple" && $(this).prop("selectedIndex") > 0) hasFilled = true;
            if ($(this).prop("type") == "checkbox" && $(this).is(":checked")) hasFilled = true;
            if ($(this).prop("type") == "radio" && $(this).is(":checked")) hasFilled = true;
        }
    });
    if (!hasFilled) {
        ShowMessage("Please select atleast one search criteria.", bannerError);
    }
    return hasFilled;
}
function CheckOneMandatoryWithRequired(group) {
    selector = "." + group + ", ." + group + " :checkbox" + ", ." + group + " :radio";
    var hasFilled = false;
    $(selector).each(function () {
        if ($(this).is(":visible") && $(this).is(":enabled")) {
            if (($(this).prop("type") == "text" || $(this).prop("type") == "textarea" || $(this).prop("type") == "password") && Validator.IsBlank($(this).val()) == false) hasFilled = true;
            if (($(this).prop("type") == "select-one") && $(this).prop("selectedIndex") > 0) hasFilled = true;
            if ($(this).prop("type") == "select-multiple" && $(this).prop("selectedIndex") > 0) hasFilled = true;
            if ($(this).prop("type") == "checkbox" && $(this).is(":checked")) hasFilled = true;
            if ($(this).prop("type") == "radio" && $(this).is(":checked")) hasFilled = true;
        }
    });
    if (!hasFilled) {
        ShowMessage("Please select atleast one search criteria apart from Scheme.", bannerError);
    }
    return hasFilled;
}
function AddErrorMessage(selector, message) {
    AddMessage("<b>" + $(selector).prop("title") + "</b> " + message);
    MarkBad(selector);
}
//error,success,warn
function ShowMessage(message, style) {
    AddMessage(message);
    ShowBanner(style);
    ClearMessage();
}
function ShowBanner(style) {
    if (arrMessage.length < 1) {
        HideBanner();
        return;
    }
    message = "<ul>";
    for (var index = 0; index < arrMessage.length; index++) {
        message = message + "<li>" + arrMessage[index] + "</li>";
    }
    message = message + "</ul>";

    $("#banner").html(message);

    $("#banner").removeClass('error');
    $("#banner").removeClass('success');
    $("#banner").removeClass('warn');

    $("#banner").addClass(style);
    if ($("#banner").is(":visible"))
        $("#banner").stop(true, true).fadeOut(100).fadeIn(200);
    else
        $("#banner").stop(true, true).fadeIn(200);

    //$("#banner").width($("#banner").width() + 20);
    ClearMessage();
    return false;
}
function HideBanner() {
    $("#banner").stop(true, true).fadeOut(500);
}
/*Message & Error Handling */

function SetHeader() {
    $(".grid").each(function () {
        $(this).find(".header").width($(this).width() + "px");
    });
}
function EnableScrollSave() {
    $("select").each(function () {
        if ($(this).prop("type") == "select-multiple") {
            $(this).bind("scroll", function () { SaveScrollPosition(this); });
        }
    });
}
function ResetScrollPosition() {
    $("select").each(function () {
        if ($(this).prop("type") == "select-multiple") {
            SetCookieValue($(this).attr("id"), 0, new Date());
        }
    });
}
function RestoreScrollPosition() {
    $("select").each(function () {
        if ($(this).prop("type") == "select-multiple") {
            var scrollPos = GetCookieValue($(this).attr("id"));
            if (!isNaN(scrollPos))
                $(this).animate({ scrollTop: scrollPos }, 500);
        }
    });
}
function SaveScrollPosition(control) {
    var controlID = control.id;
    var dtNew = new Date();
    dtNew.setDate(dtNew.getDate() + 1);
    SetCookieValue(controlID, $("#" + controlID).scrollTop(), dtNew);
}
function OpenPopup(url, properties) {
    var newWin = window.open(url, "_blank", properties);
    if (newWin == null || newWin == undefined || newWin.toString() == "null") {
        ShowMessage("Popup was blocked. Please allow popup in your browser settings.", bannerError);
    }
}
function ShowHallTicketPopup() {
    HideBanner();
    var properties = "height=550,width=650,left=0px,top=0px,location=no,menubar=no,resizable=0,scrollbars=yes,status=no,titlebar=no";
    var url = "PrintHallTicketPopUp.aspx";
    OpenPopup(url, properties);
    return false;
}
function ShowNACPopup() {
    HideBanner();
    var properties = "height=550,width=650,left=0px,top=0px,location=no,menubar=no,resizable=0,scrollbars=yes,status=no,titlebar=no";
    var url = "NACCertificatePopUp.aspx";
    OpenPopup(url, properties);
    return false;
}
function ShowNCICPopup() {
    HideBanner();
    var properties = "height=550,width=650,left=0px,top=0px,location=no,menubar=no,resizable=0,scrollbars=yes,status=no,titlebar=no";
    var url = "NCICCertificatePopUp.aspx";
    OpenPopup(url, properties);
    return false;
}
function ShowCOEPopup() {
    HideBanner();
    var properties = "height=550,width=650,left=0px,top=0px,location=no,menubar=no,resizable=0,scrollbars=yes,status=no,titlebar=no";
    var url = "COECertificatePopUp.aspx";
    OpenPopup(url, properties);
    return false;
}

function DownloadCertificatePopup() {
    HideBanner();
    var properties = "height=550,width=650,left=0px,top=0px,location=no,menubar=no,resizable=0,scrollbars=yes,status=no,titlebar=no";
    var url = "DownloadCertificatePopup.aspx";
    OpenPopup(url, properties);
    return false;
}

function PrintConsolidatedMarksheetPopup() {
    HideBanner();
    var properties = "height=550,width=650,left=0px,top=0px,location=no,menubar=no,resizable=0,scrollbars=yes,status=no,titlebar=no";
    var url = "PrintConsolidatedMarksheetPopup.aspx";
    console.log("hit")
    OpenPopup(url, properties);
    return false;
}

function DownloadMarksheetPopup() {
    HideBanner();
    var properties = "height=550,width=650,left=0px,top=0px,location=no,menubar=no,resizable=0,scrollbars=yes,status=no,titlebar=no";
    var url = "DownloadMarksheetPopup.aspx";
    OpenPopup(url, properties);
    return false;
}


function ShowViewGrievancePopUp() {
    HideBanner();
    var properties = "height=550,width=650,left=0px,top=0px,location=no,menubar=no,resizable=0,scrollbars=yes,status=no,titlebar=no";
    var url = "TraineeGrievanceViewPopUp.aspx";
    OpenPopup(url, properties);
    return false;
}

function ShowMarkSheetPopup() {
    HideBanner();
    var properties = "height=600,width=950,left=0px,top=0px,location=no,menubar=no,resizable=0,scrollbars=yes,status=no,titlebar=no";
    var url = "PrintMarkSheetPopUp.aspx";
    OpenPopup(url, properties);
    return false;
}
function ShowCertificatePopup() {
    HideBanner();
    var properties = "height=600,width=800,left=0px,top=0px,location=no,menubar=no,resizable=0,scrollbars=yes,status=no,titlebar=no";
    var url = "PrintNCVTCTSCertificatePopUp.aspx";
    OpenPopup(url, properties);
    return false;
}

function ShowConsolidatedMarksheetPopup() {
    HideBanner();
    var properties = "height=600,width=800,left=0px,top=0px,location=no,menubar=no,resizable=0,scrollbars=yes,status=no,titlebar=no";
    var url = "PrintConsolidatedMarksheetPopup.aspx";
    OpenPopup(url, properties);
    return false;
}

function ShowCFICertificatePopup() {
    HideBanner();
    var properties = "height=600,width=800,left=0px,top=0px,location=no,menubar=no,resizable=0,scrollbars=yes,status=no,titlebar=no";
    var url = "PrintNTCCertificatePopUp.aspx";
    OpenPopup(url, properties);
    return false;
}

function ShowNACCertificatePopup() {
    HideBanner();
    var properties = "height=600,width=800,left=0px,top=0px,location=no,menubar=no,resizable=0,scrollbars=yes,status=no,titlebar=no";
    var url = "PrintNACCertificatePopUp.aspx";
    OpenPopup(url, properties);
    return false;
}

function ShowConfirmation(controlSel, message, funcYes) {
    if ($("#confirm .confirmed").length > 0)
        return true;
    else {
        ShowOverlayBG();
        $("#confirm h4").html(message);
        $("#confirm").slideDown(300);
        $("#confirm #btnYes").unbind("click");
        $("#confirm #btnYes").show();
        $("#confirm #btnNo").val("No");
        $("#confirm #btnYes").bind("click", function () {
            $("#confirm #btnYes").addClass("confirmed");
            if (funcYes != null && funcYes != undefined)
                funcYes();
            return OnYes_Click(controlSel);
        });
        $("#confirm #btnYes").focus();
        return false;
    }
}
function ShowMessageAlert(message) {
    $("#confirm h4").html(message);
    ShowOverlayBG();
    $("#confirm").slideDown(300);
    $("#confirm #btnYes").hide();
    $("#confirm #btnNo").val("Ok");
    $("#confirm #btnNo").focus();
    return false;
}
function ShowMessageRedirect(message, url) {
    $("#confirm h4").html(message);
    ShowOverlayBG();
    $("#confirm").slideDown(300);
    $("#confirm #btnYes").hide();
    $("#confirm #btnNo").val("Ok");
    $("#confirm #btnNo").focus();
    $("#confirm #btnNo").click(function () { window.location = url; });
    return false;
}
function OnYes_Click(controlSel) {
    HideConfirm();
    boolPostBack = true;
    if ($(controlSel).attr('type') == 'submit' || $(controlSel).attr('type') == 'button' || $(controlSel).attr('type') == 'image') {
        $(controlSel).trigger('click');
    }
    else if ($(controlSel).is('select')) {
        $(controlSel).trigger('change');
    }
    else {
        eval($(controlSel).attr('href'));
    }
    $("#confirm #btnYes").removeClass("confirmed");
    return false;
}
function HideConfirm() {
    $("#confirm").slideUp(100);
    HideOverlayBG();
    return false;
}
function SetHome() {
    $(".homeimage").each(function () {
        $(this).find("div").hide();
        $(this).mouseenter(function () {
            $(this).find("div").stop().slideDown(100);
            $(this).find("img").stop().slideUp(100);
        });
        $(this).mouseleave(function () {
            $(this).find("img").stop().slideDown(100);
            $(this).find("div").stop().slideUp(100);
        });
    });
}
function ShowOverlay(height, width) {
    //approx dimensions for 1366X768 resolution
    //var scaleWidth = 1350;

    $("#overlay").css("width", width.toString() + "%");
    //$("#overlay").css("height", height.toString() + "%");

    ShowOverlayBG();
    $("#overlay").slideDown(300);

    ////set max height width as 80% of page's
    //var maxWidth = parseInt($(window).width() * (90 / 100));
    //var maxHeight = parseInt($(window).height() * (90 / 100));

    //var ovWidth = parseInt(scaleWidth * (width / 100));
    //var ovHeight = $("#overlay").height();

    //var left = ($(window).width() - ovWidth) / 2;
    //var top = ($(window).height() - ovHeight) / 2;
    //if (ovHeight > maxHeight) {
    //    ovHeight = maxHeight;
    //    top = 10;
    //}
    $("#overlay").css("top", ((100 - height) / 2).toString() + "%");
    $("#overlay").css("left", ((100 - width) / 2).toString() + "%");

    //$("#overlay").css("width", ovWidth.toString() + "px");
    //$("#overlay").css("height", ovHeight.toString() + "px");
    //alert(top);

    return false;
}
function HideOverlay() {
    $("#overlay").slideUp(100);
    HideOverlayBG();
    return false;
}
function ShowOverlayBG() {
    $("#overlay_bg").fadeIn(200);
}
function HideOverlayBG() {
    $("#overlay_bg").fadeOut(200);
}
function SetUnselectable() {
    $('.unselectable, .unselectable *').each(function () {
        $(this).prop("unselectable", "on");
    });
}
function EnableGridClickSelect() {
    $(".grid .row, .grid .alt_row, .grid .plain_header, .grid .warn_row").each(function () {
        $(this).find("th, td").first().find(":checkbox:enabled:first").bind("click", function (e) {
            e.stopPropagation();//stop firing row click event
        });

        if (($(this).parent().find(":checkbox:enabled").length == 0)) {
            $(this).parent().css("cursor", "default");
        }
        else {
            $(this).parent().css("cursor", "pointer");
        }
        $(this).bind("click", function () {
            if ($(this).find("th, td").first().find(":checkbox:enabled").length > 0) {
                $(this).find("th, td").first().find(":checkbox:enabled:first").trigger('click');
            }
        });

        //}
    });
}
function EnableCheckOne() {
    $(".checkone").find(":checkbox").each(function () {
        $(this).bind("click", function () {
            $(this).parent().parent().parent().find(":checkbox:checked").not(this).prop("checked", false);
        });
    });
}
function ClearForm(selector) {
    ClearBad();
    HideBanner();
    $(selector).find("input[type=text], input[type=password], textarea").val("");
    $(selector).find("select").prop('selectedIndex', 0);
    $(selector).find(":checked").prop('checked', false);
    return false;
}
function SetOverflow() {
    $(".overflow_x").each(function () {
        var gridWidth = $(this).width();
        $(this).hide();//hide div so that parent does not inflate
        var divWidth = $(this).parent().width();
        $(this).css("width", divWidth.toString() + "px");
        $(this).find(".grid").each(function () {
            $(this).css("width", gridWidth.toString() + "px");
        });
        $(this).show();
    });
}
function SetTextAreaMax() {
    var maxLength = 500;
    $("textarea").each(function () {
        var message = "<b>" + $(this).prop("title") + "</b> can have max length of " + maxLength.toString() + " characters."
        $(this).bind("keypress", function (e) {
            if ($(this).val().length >= maxLength) {
                e.preventDefault();
                MarkBad($(this));
                ShowMessage(message, "error");
            }
        });
        $(this).bind("blur", function (e) {
            if ($(this).val().length > maxLength) {
                $(this).val($(this).val().substr(0, maxLength));
                MarkBad($(this));
                ShowMessage(message, "error");
            }
        });
    });
}
///Shows Image in first image control in tr of the file control
function ShowImageOnSelection(control) {
    var imgBox = $('#' + control.id).parent().parent().find("img:first");

    if (Validator.IsImagePath($(control).val())) {
        try {
            var reader = new FileReader();
            reader.onload = function (e) {
                $(imgBox).attr('src', e.target.result);
            }
            reader.readAsDataURL(control.files[0]);
            $(imgBox).show();
        }
        catch (error) {
            $(imgBox).hide();
        }
    }
    else {
        $(imgBox).hide();
    }
}

function SetPreview() {
    $(".preview_file").each(function () {
        $(this).click(function () { ShowImageOnSelection(this); });
        $(this).change(function () { ShowImageOnSelection(this); });
    });
    SetPreviewHover();
}

function SetPreviewHover() {
    $(".preview").each(function () {
        $(this).mouseover(function () { PreviewMaximize(this); });
        $(this).mouseout(function () { PreviewNormal(this); });
        PreviewNormal(this);
    });
}

function PreviewMaximize(control) {
    var imgBox = '#' + control.id;
    var top = $(imgBox).offset().top;
    var left = $(imgBox).height().left;

    $(imgBox).css({ "position": "absolute", "height": "200px", "z-index": "200", "top": top + "px", "left": left + "px" });
}

function PreviewNormal(control) {
    var imgBox = '#' + control.id;
    $(imgBox).css({ "position": "relative", "height": "40px", "z-index": "inherit", "top": "auto", "left": "auto" });
}

/*ucRating***************************/
function SetRatingControl() {
    $('.rating').each(function () {
        var controlSel = "#" + $(this).attr("id");

        SetRating(controlSel, -1);

        if (!$(this).hasClass("readonly")) {
            $(this).find('span.item').each(function () {
                $(this).click(function () {
                    SetRating(controlSel, $(this).attr('accesskey'));
                });
                $(this).dblclick(function () {
                    ReSetRating(controlSel, $(this).attr('accesskey'));
                });
                $(this).mouseenter(function () {
                    ShowRating(controlSel, $(this).attr('accesskey'));
                });
                $(this).mouseleave(function () {
                    SetRating(controlSel, -1);
                });
            });
            $(this).find('span.blocked').each(function () {
                //  $(this).removeClass('rated');
                //$(this).addClass('unrated');
            });
        }
        else {
            $(this).find('span.item').each(function () {
                $(this).css("cursor", "default");
            });
        }
    });
}

function BlockRatingControl() {
    $('.rating').each(function () {
        var controlSel = "#" + $(this).attr("id");

        SetRating(controlSel, -1);

        if (!$(this).hasClass("readonly")) {
            $(this).find('span.blocked').each(function () {
                $(this).find('input[type=hidden]').val(0);//label parent td, td parent tr
                ShowRating(this, 0);
            });
        }
        else {
            $(this).find('span.item').each(function () {
                $(this).css("cursor", "default");
            });
        }
    });
}
function SetRating(control, rating) {
    if (rating < 0)
        rating = $(control).find('input[type=hidden]').val(); //label parent td, td parent tr
    else if (rating == undefined || isNaN(rating) || rating == '')
        rating = 0;

    $(control).find('input[type=hidden]').val(rating);//label parent td, td parent tr
    ShowRating(control, rating);
}

function ReSetRating(control, rating) {
    rating = 0;
    $(control).find('input[type=hidden]').val(rating);//label parent td, td parent tr
    ShowRating(control, rating);
}
function ShowRating(control, rating) {
    if (rating == undefined || isNaN(rating) || rating == '')
        rating = 0;

    //var a = rating + ' star <br />click to select \ndouble click to unselect';
    //var b = a.replace('<br />', '\n');
    //$(control).attr('title', b);
    //$(control).attr('title', rating + ' star \nClick to select  \nDouble click to unselect'); Commented by Arun for Final Rating
    $(control).attr('title', rating + ' star');//Added by Arun

    $(control).find('span.item, span.blocked').removeClass('rated');
    $(control).find('span.item, span.blocked').removeClass('unrated');
    $(control).find('span.item, span.blocked').addClass('unrated');

    $(control).find('span.item, span.blocked').each(function (index) {
        if ((index + 1) <= rating) {
            $(this).removeClass('unrated');
            $(this).addClass('rated');
        }
    });
}
/*ucRating***************************/

function ShowMessageClose(message) {
    alert(message);
    window.close();
}
function ToggleMobile() {
    if ($(window).innerWidth() < 1200) {
        $("body").removeClass("desktop");
        $("body").addClass("mobile");
    }
    $(window).resize(function () { ToggleMobile(); });
}

function DownloadFilePopup(fileName, filePath) {
    var url = "/Pages/FileDownload.aspx?name=" + fileName + "&path=" + filePath;
    var properties = "height=300,width=500,left=0,top=0,location=no,menubar=no,resizable=0,scrollbars=yes,status=no,titlebar=no";
    OpenPopup(url, properties);
}