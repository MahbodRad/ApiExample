﻿
var GlobalFlag = false;
var CNT = 0;

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

function SpinnerShow(Area, TITR) { if (typeof Area != 'object') Area = '#' + Area; if (TITR != null) { $(Area).html('<div class="w-100 text-center font-20 text-primary">' + TITR + '</div><div class="w-100"><img src="../images/loader.gif" class="w-max-100 mx-auto" /></div>'); } else { $(Area).html('<div class="w-100"><img src="../images/loader.gif" class="w-max-100 mx-auto" /></div>'); } }
function SpinnerShowBtn(Btn) {if (typeof Btn != 'object')Btn = '#' + Btn;$(Btn).html('<img src="../images/loading.gif" class="w-max-40" />');}
function copyToClipboard(txt, MSG) {var $temp = $("<textarea>");$("body").append($temp);$temp.val(txt).select();document.execCommand("copy");$temp.remove();if (MSG != '') {ShowMsg('kopyala', MSG);}}
function copyAreaToClipboard(Area, MSG) { var copytext = EleText(Area); var input = document.createElement('textarea'); input.innerHTML = copytext; document.body.appendChild(input); input.select(); var result = document.execCommand('copy'); document.body.removeChild(input); if (MSG != '') { ShowMsg('کپی', MSG);} return result;}
function isJsonString(str) { try { JSON.parse(str); return true; } catch (e) { ShowMsg('توجه', str); return false; } }
function RowSelectColor(AREA, ROW) {SetHtml(AREA, EleHtml(AREA).replace('bg-info', ''));if (typeof ROW != 'object')ROW = '#' + ROW;$(ROW).addClass("bg-info");}
function CheckErrorSelect(SEL) {if (!$('#' + SEL).html().includes('</option>'))ShowMsg('توجه', $('#' + SEL).html());}
function AreaClear(Area) { $('#' +Area).text('') }
function SpinnerShowForm(TITR) { SpinnerHideForm(); $('#SpinnerMsg_TITR').text(TITR); $("#Spinner_Btn").click()}
function SpinnerHideForm() { $("#ModalSpinerClose").click(); }
function AreaShow(Area) { $('#'+Area).show(500) }
function AreaHide(Area) { $('#' + Area).hide(500) }
function AreaToggelSH(Area) { if ($('#' + Area).is(':visible')) { $('#' + Area).hide(500); } else { $('#' + Area).show(500); } }
function AreaToggel(Area) { if ($('#' + Area).is(':visible')) { $('#' + Area).slideUp(500); } else { $('#' + Area).slideDown(500); } }
function AreaUp(Area) { $('#' + Area).slideUp(500); }
function AreaDown(Area) { $('#' +Area).slideDown(500); }
function SetBackColor(Area) { $('#' +Area).addClass("bg-Learn"); }
function ShowMsgArea(Area, MSG) { $('#' +Area).html('<div class="row"><div class="col font-17"><p class="bg-Learn w-max-350 mx-auto text-center spc-pre-line"><span class="icofont-alarm font-22 text-warning mx-2"></span><span>' + MSG + '</span></p></div></div>');}
function ShowMsg(TITR, MATN) { $("#ShowMsg_TITR").text(TITR); $("#ShowMsg_MATN").html(MATN); AreaDown('MsgAreaModal'); }
function MsgFormShow(TITR) { $("#MsgForm_TITR").text(TITR); $("#MsgFrom_Btn").click(); }
function MsgForm(TITR, MATN) { $("#MsgForm_TITR").text(TITR); $("#MsgForm_MATN").html(MATN); $("#MsgFrom_Btn").click(); }
function MsgFormSpinner(TITR, MATN) { $("#MsgForm_TITR").text(TITR); SpinnerShow('MsgForm_MATN'); $("#MsgFrom_Btn").click(); }
function SetHtml(Area, HTML) { $('#' + Area).html(HTML); }
function SelectWait(S, M) { $('#' +S).html("<option value='0'>" + M + "</option>"); }
function SelectSet(S, V, T) { $('#' + S).html("<option value='" + V + "'>" + T + "</option>"); }
function SelectOptionData(S, D) { return $('#' + S).find(':selected').attr(D); }
function SelectOptionText(S) { return S.options[S.selectedIndex].text; }
function MenuToggel() { if ($('#MenuArea').width() == 0) { $('#MenuArea').width(180); $('#MainArea').css("padding-right", "180px"); $('footer-page').width($('footer-page').width() - 180); } else { $('#MenuArea').width(0); $('#MainArea').css("padding-right", "0px"); $('footer-page').css("width", "100%"); }; };

function GoToPos(P) { $('body,html').animate({ scrollTop: P }, 800); return false; }
function GoToPosArea(Area) { var x = $('#' + Area).position(); GoToPos(x.top - 50); }
function GoToPosTopArea(Area) { var x = $('#' + Area).position(); GoToPos(x.top - 100); }
function GoToPosChart(Area) { var x = $('#' + Area).position(); GoToPos(x.top ); }
function Zoom(Pic) { SetHtml('ZoomPic', EleHtml(Pic)); $("#Zoom_Btn").click(); }
function ScrollSlave(Master, Slave) { $('#' + Slave).scrollLeft($(Master).scrollLeft()); }
function ScrollLeft(Element, Scale = '200') {
    $('#' + Element).animate({ scrollLeft: '-=' + Scale }, 1000);
}
function ScrollRight(Element, Scale = '200') {
    $('#' + Element).animate({ scrollLeft: '+=' + Scale }, 1000);
}

function CheckBoxClick(CHK) {
    // کلید روی یک چک باکس
    if ($(CHK).val() == 'YES') {
        $(CHK).val('NO');
    }
    else {
        $(CHK).val('YES');
    }
}
function ControlMsg(N) {
    if (N != 0)
        ShowMsg('مرکز پیام', 'برای شما پیام جدید آمده است. لطفا مرکز پیام را کنترل کنید');
}
LoginComp = function (RES) {
    if (isJsonString(RES.responseText)) {
        var RS = JSON.parse(RES.responseText);
        if (RS.a == "OK") {
            window.location = RS.b;
        }
        else {
            SetTextMain('RES', RS.b);
            ShowMsg('خطا در ورود به سیستم', RS.b);
        }
            
    }
}

function SetLocalValue(V) { /*پرکردن مقدار جاری متغیر روی فرم*/ $('#LocalValue').val(V);}
function ChangIcon(S, I1, I2) {
    // تغییر یک آیکون
    if (typeof S != 'object')
        S = '#' + S;

    Rotate(S, 'Z');
    if ($(S).hasClass(I1)) {
        $(S).removeClass(I1);
        $(S).addClass(I2);
    }
    else {
        $(S).removeClass(I2);
        $(S).addClass(I1);
    }
}
function ChangClass(S, A, R) {
    // تغییر یک آیکون
    S = '#' + S;
    $(S).removeClass(R);
    $(S).addClass(A);
}
function Rotate(ELM, XYZ) {
    if (XYZ == 'Y')
        $(ELM).addClass('bg-info');

    if ($(ELM).hasClass('rotated360' + XYZ)) {
        $(ELM).removeClass('rotated360' + XYZ);
        $(ELM).addClass('rotated0');
    }
    else {
        $(ELM).removeClass('rotated0');
        $(ELM).addClass('rotated360' + XYZ);
    }
}

function MenuItemClick(ELM) {
    $('#waitbody').css('display', 'flex');
    $(ELM).addClass('menu-Item');
    $(ELM).css('width', '50px');
    
}
function GoToTop() {
    $('body,html').animate({
        scrollTop: 0
    }, 800);
    return false;
}
function PikerDate(A) {
    if (A=='')
        $(".usage").persianDatepicker({ theme: "latoja", formatDate: "YYYY/0M/0D", cellWidth: 30, cellHeight: 26, fontSize: 15, });
    else
        $("#"+A).persianDatepicker({ theme: "latoja", formatDate: "YYYY/0M/0D", cellWidth: 30, cellHeight: 26, fontSize: 15, });
}
function AddSelectedItem(E, ID) {
    // کنترل میکند که آیا مقدار داده شده در مقادیر ذخیره شده است یا نه
    // اگر نبود اضافه شود و اگر بود حذف شود
    var IDValue = ',' + ID + ',';
    var IdValue = EleValue(E);
    if (IdValue.includes(IDValue) == true)
        IdValue = IdValue.replace(IDValue, ',');
    else
        IdValue += ID + ',';
    SetValueSimplMain(E, IdValue);
}
function EnterKey(e, BTN) {
    //فشردن کلید اینتر برای کلیک روی یک دکمه دیگر
    var code = e.key;
    if (code === "Enter") {
        ClickBtnSimpl(BTN, '');
    }
}
function HideModels(e) {
    var code = e.key;
    if (code === "Escape") {
        GoToTop();
        AreaUp('MsgAreaModal');
        AreaUp('ModalForm');
        AreaUp('ModalSpiner');
        AreaUp('ConfirmModal');
        AreaHide('waitbody');
        AreaUp('ExcelModal');
        AreaUp('Zoombody');
        CheckConfirm = true;
    }
}

function EscKey(e, BTN) {
    //فشردن کلید Scape برای کلیک روی یک دکمه دیگر
    var code = e.key;
    if (code === "Escape") {
        ClickBtnSimpl(BTN, '');
    }
}
function EnglishNumber(NUMBER) {
    if (NUMBER=="")
        return NUMBER
    else
        return NUMBER.replace("۰", "0").replace("۱", "1").replace("۲", "2").replace("۳", "3").replace("۴", "4").replace("۵", "5").replace("۶", "6").replace("۷", "7").replace("۸", "8").replace("۹", "9");
}

function AddComma(INP) {
    NUM = EnglishNumber(INP.value);

    INP.value = numberWithCommas(NUM.replace(/[^0-9 \,.]/, ''));
//    $(INP).val(numberWithCommas($(INP).val()));
}
function numberWithCommas(x) {
    x = x.toString();
    x = numberClearCommas(x);
    if (x != '0')
        x = x.replace(/^0+/, '');

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberClearCommas(x) {
    x = x.toString();
    return x.replace(/,/g, "");
}

function AddDash(INP) {
    $(INP).val(numberWithDash($(INP).val()));
}
function numberWithDash(x) {
    x = x.toString();
    x = numberClearDash(x);

    N = '';
    j = 0;
    i = x.length;
    L = 0;
    while (i > 0) {
        if (j == 4) {
            N += '_';
            j = 0;
        }
        j += 1;
        N += x.substring(L, L+1);
        i -= 1;
        L += 1;
    }

    return N.toString();
}

function numberClearDash(x) {
    x = x.toString();
    return x.replace(/_/g, "");
}


function NqVahed(Nq, NqVahed, KalaNq) {
   //مقدار بسته را میگیرد و مقدار واحد را حساب میکند و در فیلد واحد مینویسد
    let NqBaste = 0;
    NqBaste = numberClearCommas($(Nq).val());
    $(Nq).val(numberWithCommas(NqBaste));
    if (KalaNq != 0 & KalaNq != '')
        NqBaste = (NqBaste * KalaNq).toLocaleString("en-US", { maximumFractionDigits: 3, minimumFractionDigits: 0 });

    $('#' + NqVahed).val(numberWithCommas(NqBaste));
}
function NqBaste(Nq, NqBaste, KalaNq) {
    //مقدار واحد را میگیرد و مقدار بسته را حساب میکند و در فیلد بسته مینویسد
   let NqVahed = 0;
    NqVahed = numberClearCommas($(Nq).val());
    $(Nq).val(numberWithCommas(NqVahed));
    if (KalaNq != 0 & KalaNq != '')
        NqVahed = (NqVahed / KalaNq).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 });;

    $('#' + NqBaste).val(numberWithCommas(NqVahed));
}

function EleValue(X) {
    if (typeof X != 'object')
        X = '#' + X;
    return $(X).val();
}
function EleText(X) {
    if (typeof X != 'object')
        X = '#' + X;
    return $(X).text();
}
function EleHtml(X) {
    if (typeof X != 'object')
        X = '#' + X;
    return $(X).html();
}

function SortListKala(Btn, FSort, Sort, Act, DAct, FTp='', Tp='') {
    //تغییر رنگ دکمه های سورت کالا و پرکردن فیلدها مربوط برای اصلاح گزارش کالا
    $('#' + FSort).val(Sort);

    if (FTp != "") {
        if (typeof FTp != 'object')
            FTp  = '#' + FTp ;
        $(FTp).val(Tp);
    }
    $('#'+Btn).click();

    $('#'+DAct).removeClass("btn_Selected");
    if (Act != "") {
        if (typeof Act != 'object')
            Act = '#' + Act ;
        $(Act).addClass("btn_Selected");
    }
}
function RowSelect(ROW) {
    if (typeof ROW != 'object')
        ROW = '#' + ROW;

    if ($(ROW).hasClass("Row_Select"))
        $(ROW).removeClass("Row_Select");
    else
        $(ROW).addClass("Row_Select");
}

function Btn_Select(Act, BTNArea) {
    //در ناحیه مشخص شده عنصرهای مختلف را پیدا میکند و رنگشون رااز حالت انتخاب در میاره و اونی که فعال است را رنگش را به حالات انتخاب میبرد
    $('#' + BTNArea).find('button').removeClass("btn_Selected");
    if (typeof Act != 'object')
        Act = '#' + Act;
    $(Act).addClass("btn_Selected");

}
function Btn_SelectFlat(Act, BTNArea) {
    //در ناحیه مشخص شده عنصرهای مختلف را پیدا میکند و رنگشون رااز حالت انتخاب در میاره و اونی که فعال است را رنگش را به حالات انتخاب میبرد
    $('#' + BTNArea).find('button').removeClass("btn_SelectedFlat");
    if (typeof Act != 'object')
        Act = '#' + Act;
    $(Act).addClass("btn_SelectedFlat");
}
function Area_Select(Act, Area, KND) {
    //در ناحیه مشخص شده عنصرهای مختلف را پیدا میکند و پنهانشون میکنه و فقط یکی را نمایش میده
    $('#'+Area).find(KND).slideUp(1000);
    if (typeof Act != 'object')
        Act = '#' + Act;
    $(Act).slideDown(1000);
}
// کنترل اینکه بعد از گزارش چاپ میگیرد یا نه
function ControlChap(BTN) {
    var knd = EleValue(BTN);
    if (knd == "0" || (knd == ""))
        return;
     
    if (knd == "CHAP") {
        ChapShow();
        return;
    }

    if (knd == "PDF") {
        PdfShow();
        return;
    }

    if (knd == "XLS")
        $('#Excel_Btn').click();

    if (knd == "SND")
        ShowMsg('ارسال پیام','گزارش ارسال شد');

}
function ChapShow() {
    // تابع نمایش PDF برای چاپ گرفتن 
    try {
        printJS('../Upload/' + EleValue('ChapName') + ".pdf?" + $.now())
    }
    catch {
        PdfShow();
    }
}
function ExcelShow() {
    $("#ChapLink").attr("href", "../Upload/" + EleValue('ChapName') + ".xlsx?" + $.now());
    document.getElementById("ChapLink").click();
}
function ExcelWebShow() {
    $("#ChapLink").attr("href", "../Upload/" + EleValue('ChapName') + ".html?" + $.now());
    document.getElementById("ChapLink").click();
}
function PdfShow() {
    $("#ChapLink").attr("href", "../Upload/" + EleValue('ChapName') + ".pdf?" + $.now());
    document.getElementById("ChapLink").click();
}
function expand(obj) {
    obj.size = 5;
}
function unexpand(obj) {
    obj.size = 1;
}
function HelpShow() {
    if ($("#HelpArea").text() == "")
        $("#HelpBtn").click();

    GoToPosArea("HelpArea");
}
function SetTextMain(A = '', T) {
    if (A == '')
        return;
    if (typeof A != 'object')
        A = '#' + A;
    $(A).text(T);
}

function SetText(A1, T1, A2 , T2, A3 , T3, A4 , T4, A5, T5, A6, T6, A7 , T7, A8 , T8, A9 , T9, A10 , T10) {
    //نوشتن متن برای 10 ناحیه
    SetTextMain(A1, T1);
    SetTextMain(A2, T2);
    SetTextMain(A3, T3);
    SetTextMain(A4, T4);
    SetTextMain(A5, T5);
    SetTextMain(A6, T6);
    SetTextMain(A7, T7);
    SetTextMain(A8, T8);
    SetTextMain(A9, T9);
    SetTextMain(A10, T10);
}
function SetValueMain(E = '', V) {
    if (E == '')
        return;
    if (typeof E != 'object')
        E = '#' + E;
     $(E).val(EleValue(V));
}
function SetValue(E1 , V1, E2 , V2, E3 , V3, E4 , V4, E5 , V5, E6 , V6, E7 , V7, E8 , V8, E9 , V9, E10 , V10) {
//جایگزینی مقدار برای 10 عنصر
    SetValueMain(E1, V1);
    SetValueMain(E2, V2);
    SetValueMain(E3, V3);
    SetValueMain(E4, V4);
    SetValueMain(E5, V5);
    SetValueMain(E6, V6);
    SetValueMain(E7, V7);
    SetValueMain(E8, V8);
    SetValueMain(E9, V9);
    SetValueMain(E10, V10);
}
function SetValueSimplMain(F = '', V = '') {
    if (F == '')
        return;
    if (typeof F != 'object')
        F = '#' + F;
    $(F).val(V);
}
function SetValueSimpl(F1, V1, F2, V2, F3, V3, F4, V4, F5, V5, F6, V6, F7, V7, F8, V8, F9, V9, F10, V10) {
    // مقدار دهی ساده برای 10 فیلد
    SetValueSimplMain(F1, V1);
    SetValueSimplMain(F2, V2);
    SetValueSimplMain(F3, V3);
    SetValueSimplMain(F4, V4);
    SetValueSimplMain(F5, V5);
    SetValueSimplMain(F6, V6);
    SetValueSimplMain(F7, V7);
    SetValueSimplMain(F8, V8);
    SetValueSimplMain(F9, V9);
    SetValueSimplMain(F10, V10);
}
function ClickBtnSimpl(BTN, VALU, F1, V1, F2, V2, F3, V3, F4, V4, F5, V5, F6, V6, F7, V7, F8, V8, F9, V9, F10, V10) {
// مقدار دکمه و سایر فیلدها را به صورت ساده مقدار گزاری کند و کلیک کند
    SetValueSimpl(F1, V1, F2, V2, F3, V3, F4, V4, F5, V5, F6, V6, F7, V7, F8, V8, F9, V9, F10, V10);

    if (typeof BTN != 'object')
        BTN = '#' + BTN;
    if (VALU != '')
        $(BTN).val(VALU);

    $(BTN).click();
}
function ClickBtnValu(BTN, Element, F1, EL1, F2, EL2, F3, EL3, F4, EL4, F5, EL5, F6, EL6, F7, EL7, F8, EL8, F9, EL9, F10, EL10) {
// مقدار دکمه و سایر فیلدها را از مقدار سایر عنصرها مقدارگزاری کند و کلیک کند
    SetValue(F1, EL1, F2, EL2, F3, EL3, F4, EL4, F5, EL5, F6, EL6, F7, EL7, F8, EL8, F9, EL9, F10, EL10);

    if (typeof BTN != 'object')
        BTN = '#' + BTN;
    if (Element != '')
        $(BTN).val(EleValue(Element));

    $(BTN).click();
}
function ClickBtnSimplValu(BTN, VALU, F1 = '', EL1, F2 = '', EL2, F3 = '', EL3, F4 = '', EL4, F5 = '', EL5, F6 = '', EL6, F7 = '', EL7, F8 = '', EL8, F9 = '', EL9, F10 = '', EL10) {
    // مقدار یک دکمه را به صورت ساده بنویسید
    // مقادیر 10 عنصرهای دیگر را از عنصرهای دیگر بگیرد 
    SetValue(F1, EL1, F2, EL2, F3, EL3, F4, EL4, F5, EL5, F6, EL6, F7, EL7, F8, EL8, F9, EL9, F10, EL10);

    if (typeof BTN != 'object')
        BTN = '#' + BTN;
    if (VALU != '')
        $(BTN).val(VALU);

    $(BTN).click();

}
function ClickBtnValuSimpl(BTN, Element, F1, V1, F2, V2, F3, V3, F4, V4, F5, V5, F6, V6, F7, V7, F8, V8, F9, V9, F10, V10) {
    // مقدار دکمه و سایر فیلدها را به صورت ساده مقدار گزاری کند و کلیک کند
    SetValueSimpl(F1, V1, F2, V2, F3, V3, F4, V4, F5, V5, F6, V6, F7, V7, F8, V8, F9, V9, F10, V10);

    if (typeof BTN != 'object')
        BTN = '#' + BTN;
    if (Element != '')
        $(BTN).val(EleValue(Element));

    $(BTN).click();
}
function ClickBtn(BTN) {
    document.getElementById(BTN).click();
//    if (typeof BTN != 'object')
//        BTN = '#' + BTN;
//    $(BTN).click();
}
// اجرای گزارش گرفتن سریع
function RunFastReport(DATE, BTN, FORM, LD) {
// ابتدا تاریخ ست میشود و سپس گزارش گرفته میشود
    ClickBtnSimpl('LimitDateBtn', BTN
        , 'LimitDateKnd', DATE
        , 'LimitDateForm', FORM
        , BTN, '0');
    if (LD != '') {
        SetValueSimpl(LD, DATE);
    }
}
//-- توابع انتخاب تاریخ
function LimitDate(Lim,FORM) {
    // فقط تاریخ ست میشود و گزارش گرفته نمیشود
    SetValueSimpl('LimitDateBtn','');
    ClickBtnSimpl('LimitDateBtn', ''
        , 'LimitDateKnd', EleValue(Lim)
        , 'LimitDateForm', FORM);
    SpinnerShow('waitLimitDate' + FORM);
}
// بعد از گرفتن تاریخ دکمه گزارش کلیک شود
LimitDateCompelete = function (result) {
    // تاریخ
    if (isJsonString(result.responseText)) {
        var RD = JSON.parse(result.responseText);
        var FORM = EleValue('LimitDateForm');
        // دکمه گزارش گیری
        var BTN = EleValue('LimitDateBtn');
        // ست کردن تاریخ
        SetValueSimpl('FromDate' + FORM, RD.fromDate
            , 'ToDate' + FORM, RD.toDate);
        //SetValueSimpl('FromDay' + FORM, RD.fromDay
        //    , 'FromMonth' + FORM, RD.fromMonth
        //    , 'FromYear' + FORM, RD.fromYear
        //    , 'ToDay' + FORM, RD.toDay
        //    , 'ToMonth' + FORM, RD.toMonth
        //    , 'ToYear' + FORM, RD.toYear);
        AreaClear('waitLimitDate' + FORM);
        // اجرای گزارش
        if (BTN != '') {
            $('#' + BTN).click();
        }
    }
}

function GetPhoto(FILE, NAME, PHOTO) {
    var file = FILE.files[0];
    var filename = file.name;
    if (NAME != "") {
        SetText(NAME, filename);
    }
    if (FILE.files && FILE.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#' + PHOTO).attr('src', e.target.result);
        };
        reader.readAsDataURL(FILE.files[0]);
    }
}

function GetFile(FILE, NAME, KND) {
    var file = FILE.files[0];
    var filename = file.name;
    if (FILE.files && FILE.files[0]) {
        SetText(NAME, filename);
        KND = '#' + KND;
        $(KND).removeClass('icofont-upload');
        $(KND).removeClass('icofont-image');
        $(KND).removeClass('icofont-file-text');
        $(KND).removeClass('icofont-file-bmp');
        $(KND).removeClass('icofont-file-word');
        $(KND).removeClass('icofont-file-pdf');
        $(KND).removeClass('icofont-file-gif');
        $(KND).removeClass('icofont-file-excel');
        $(KND).removeClass('icofont-exclamation');
        var extension = filename.substr((filename.lastIndexOf('.') + 1));
        extension = extension.toUpperCase();
        switch (extension) {
            case 'JPG':
            case 'JPEG':
                $(KND).addClass('icofont-image');
                break;
            case 'PNG':
                $(KND).addClass('icofont-file-gif');
                break;
            case 'BMP':
                $(KND).addClass('icofont-file-bmp');
                break;
            case 'TXT':
                $(KND).addClass('icofont-file-text');
                break;
            case 'XLS':
            case 'XLSX':
                $(KND).addClass('icofont-file-excel');
                break;
            case 'DOC':
            case 'DOCX':
                $(KND).addClass('icofont-file-word');
                break;
            case 'PDF':
                $(KND).addClass('icofont-file-pdf');
                break;
            case 'ZIP':
            case 'RAR':
                $(KND).addClass('icofont-file-zip');
                break;
            default:
                $(KND).addClass('icofont-exclamation');
        }
    }
}

function SelectGrp(Active, BTN) {
    // تغییر رنگ دگمه با انتخاب
    if ($(Active).hasClass('btn_SelectedFlat')) {
        $(Active).removeClass('btn_SelectedFlat');
    }
    else {
        $(Active).addClass('btn_SelectedFlat');
    }
    // ساخت مقدار دسته های انتخاب شده
    
    var GrpKnd = '';
    if ($('#' +BTN + 'A').hasClass('btn_SelectedFlat')) { GrpKnd += 'A' }
    if ($('#' +BTN + 'B').hasClass('btn_SelectedFlat')) { GrpKnd += 'B' }
    if ($('#' +BTN + 'C').hasClass('btn_SelectedFlat')) { GrpKnd += 'C' }
    // کلیک برروی جستجوی لیست گروهها
    ClickBtnSimpl(BTN + 'Btn', GrpKnd);
}
function AddCommaDP(A, B) {
    NA = EleValue(A);
    if (NA != "" & NA != "0") {
        AddComma(A);
        SetValueSimplMain(B, '0');
    }
}
function DownloadPhoto(Area) {
    // GET CANVAS
    var canvas = document.getElementById("Picture");
    var ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 800;
    
    const tempImg = document.createElement('img');
    tempImg.src = 'data:image/svg+xml,' + encodeURIComponent(EleHtml(Area));

    ctx.drawImage(tempImg, 10, 10);
    // CREATE LINK
    let anchor = document.createElement("a");
    anchor.download = "download.jpg";
    anchor.href = canvas.toDataURL("image/jpg" );

    // "FORCE DOWNLOAD"
    anchor.click();
    anchor.remove();

}

function candown(target, type) {
    // (B1) GET CANVAS
    let canvas = document.getElementById(target);

    // (B2) CREATE LINK
    let anchor = document.createElement("a");
    anchor.download = "download." + type;
    anchor.href = canvas.toDataURL("image/" + type);

    // (B3) "FORCE DOWNLOAD"
    anchor.click();
    anchor.remove();

    // (B4) SAFER ALTERNATIVE - LET USER CLICK ON LINK
    // anchor.innerHTML = "Download";
    // document.body.appendChild(anchor);
}
function AreaToggelWhitId(Area, Id) { (EleValue(Id) == "0") ? AreaShow(Area) : AreaHide(Area); }
function AreaToggelWhitIdNot(Area, Id) { (EleValue(Id) > "0") ? AreaShow(Area) : AreaHide(Area) ; }
function ActiveArea(AREA, ACTIVE) {
    $("#" + AREA).find('.AreaDetail').hide(500);
    $('#' + ACTIVE).show(500);
}
function ToggelYesNo(ELM, FLD) {
    var SRC = $(ELM).attr('src');
    if (EleValue(FLD) == "Y") {
        SRC = SRC.replace('Btn_Yes', 'Btn_No');
        $(ELM).attr('src', SRC);
        SetValueSimpl(FLD, 'N');
    }
    else {
        SRC = SRC.replace('Btn_No', 'Btn_Yes');
        $(ELM).attr('src', SRC);
        SetValueSimpl(FLD, 'Y');
    }
};

function ChangAllCass(AREA, DeActive, ACTIVE) {
    $("#" + AREA).find('.' + DeActive).addClass(ACTIVE).removeClass(DeActive);
}
