"use strict";
let DocTitlenames = Array("Website of Mother1Brain", "Data Central: Brain Mother", "Mother-Data: Brain Central", "Brain Central: Data Mother", "undefined-Brain: undefined Data", "Mom-brain: Integer Control", "Mother-brain: Data Central", "Are you reloading the page?", "Data Mother: Central Brain", "Central: Data Brain Mother", "Brain Data: Mother Central", "YT: 'watch?v=DLzxn1SgKds' Watch..");
document.title =
    DocTitlenames[Math.floor(Math.random() * DocTitlenames.length)];
let faviconSrcs = Array("MotherBrainIconGrat.png", "MotherBrainIconChar.png", "MotherBrainIconCRT.png", "MotherBrainIconIllu.png", "MotherBrainIconTessa.png");
let favicon = document.getElementById("Favicon");
let P_path = document.getElementById("path");
favicon.setAttribute("href", `${P_path.textContent}${faviconSrcs[Math.floor(Math.random() * faviconSrcs.length)]}?v=${Math.random() * 10}`);
let ArtworkInfo = Array("GratFumo.png; Fumo Grat; 27. 9 2022", "Butt.gif; Icon of the Motherbrain Discord; 27. 9 2022", "Butt2.gif; Prototype Icon; 27. 9 2022", "IlluProfile.png; Illu Winks!; 27. 9 2022", "Lampreyhole.png; Lampreyhole; 27. 9 2022", "OfflineScreenGratVer1.png; OfflineScreen i use for Twitch!; 27. 9 2022", "Sprite-0001.png; Jerma roblox horror stream thumbnail; 27. 9 2022", "Skærmbillede 2022-08-04 230758.png; Mascot for H.O.T!; 27. 9 2022", "GratMebo.gif; Please place on a Skylanders™ portal; 29. 9 2022", "RotatePanties.gif; Rotating underwear; 29. 9 2022", "Skærmbillede 2022-09-10 173921.png; A N G E R Y; 29. 9 2022", "SpinGifHOT.gif; Full view of H.O.T's Mascot!; 29. 9 2022");
let ArtworkSrcs = Array();
let ArtworkAlt = Array();
let ArtworkDate = Array();
for (let index = 0; index < ArtworkInfo.length; index++) {
    const element = ArtworkInfo[index].split(";");
    ArtworkSrcs.push(element[0]);
    ArtworkAlt.push(element[1]);
    ArtworkDate.push(element[2]);
}
let ArtworkModels = document.getElementById("ArtworkModels");
if (ArtworkModels != null) {
    for (let index = 0; index < ArtworkSrcs.length; index++) {
        PrintArtwork(ArtworkSrcs[index], ArtworkAlt[index]);
    }
}
function PrintArtwork(ArtworkSrc, Alt) {
    var _a;
    let ArtPath = (_a = document.getElementById("ArtPath")) === null || _a === void 0 ? void 0 : _a.innerHTML;
    let ArtworkImages = document.getElementById("ArtworkImages");
    let OverDiv = document.createElement("div");
    let UnderDiv = document.createElement("div");
    let imgA = document.createElement("a");
    let ImgThumbnail = document.createElement("img");
    let CaptionP = document.createElement("p");
    OverDiv.classList.add("d-flex", "align-items-center", "justify-content-center", "col", "m-2");
    CaptionP.classList.add("text-center", "mx-3");
    CaptionP.innerHTML = Alt;
    imgA.setAttribute("href", `${ArtPath}${ArtworkSrc}`);
    ImgThumbnail.classList.add("img-thumb", "rounded", "alt", "hover-shadow", "m-auto", "d-block");
    ImgThumbnail.setAttribute("src", `${ArtPath}${ArtworkSrc}`);
    ImgThumbnail.setAttribute("alt", Alt);
    imgA.append(ImgThumbnail);
    UnderDiv.append(imgA);
    UnderDiv.append(CaptionP);
    OverDiv.append(UnderDiv);
    ArtworkImages.append(OverDiv);
}
