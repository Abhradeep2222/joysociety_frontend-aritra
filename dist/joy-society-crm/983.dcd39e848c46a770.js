"use strict";(self.webpackChunkjoy_society_crm=self.webpackChunkjoy_society_crm||[]).push([[983],{3222:(O,v,g)=>{g.d(v,{K:()=>A});var e=g(4650),M=g(9061),_=g(6895);function u(n,l){if(1&n&&(e.TgZ(0,"div"),e._UZ(1,"img",5),e.qZA()),2&n){const s=e.oxw();e.Gre("body-img ",null==s.data?null:s.data.imgContainerClass,""),e.xp6(1),e.Q6J("src",null==s.data?null:s.data.bodyImg,e.LSH)("alt",null==s.data?null:s.data.imgAlt)}}function y(n,l){if(1&n&&(e.TgZ(0,"div",6),e._UZ(1,"div",7),e.qZA()),2&n){const s=e.oxw();e.xp6(1),e.Q6J("innerHTML",null==s.data?null:s.data.info,e.oJD)}}function x(n,l){if(1&n){const s=e.EpF();e.TgZ(0,"button",9),e.NdJ("click",function(){e.CHM(s);const C=e.oxw(2);return e.KtG(C.cancelAction())}),e._uU(1),e.qZA()}if(2&n){const s=e.oxw(2);e.Gre("btn ",null!=s.data&&s.data.cancelBtnClass?null==s.data?null:s.data.cancelBtnClass:"",""),e.xp6(1),e.hij(" ",null==s.data?null:s.data.cancelBtn," ")}}function T(n,l){if(1&n){const s=e.EpF();e.TgZ(0,"button",9),e.NdJ("click",function(){e.CHM(s);const C=e.oxw(2);return e.KtG(C.okAction())}),e._uU(1),e.qZA()}if(2&n){const s=e.oxw(2);e.Gre("btn ",null!=s.data&&s.data.okBtnClass?null==s.data?null:s.data.okBtnClass:"",""),e.xp6(1),e.hij(" ",null==s.data?null:s.data.okBtn," ")}}function f(n,l){if(1&n&&(e.TgZ(0,"div"),e.YNc(1,x,2,4,"button",8),e.YNc(2,T,2,4,"button",8),e.qZA()),2&n){const s=e.oxw();e.Tol(null==s.data?null:s.data.btnContainerClass),e.xp6(1),e.Q6J("ngIf",null==s.data?null:s.data.cancelBtn),e.xp6(1),e.Q6J("ngIf",null==s.data?null:s.data.okBtn)}}let A=(()=>{class n{constructor(s){this.activeModal=s}ngOnInit(){}okAction(){this.activeModal.close(!0)}cancelAction(){this.activeModal.close()}}return n.\u0275fac=function(s){return new(s||n)(e.Y36(M.Kz))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-info-popup"]],inputs:{data:"data"},decls:7,vars:3,consts:[[1,"modal-body","px-4","py-4"],[1,"close",3,"click"],["src","assets/img/close.png","alt","close","width","22","height","22"],[3,"class",4,"ngIf"],["class","info",4,"ngIf"],[1,"img-fluid",3,"src","alt"],[1,"info"],[3,"innerHTML"],["type","button",3,"class","click",4,"ngIf"],["type","button",3,"click"]],template:function(s,m){1&s&&(e.TgZ(0,"div",0)(1,"div",1),e.NdJ("click",function(){return m.cancelAction()}),e._UZ(2,"img",2),e.qZA(),e.TgZ(3,"div"),e.YNc(4,u,2,5,"div",3),e.YNc(5,y,2,1,"div",4),e.qZA(),e.YNc(6,f,3,5,"div",3),e.qZA()),2&s&&(e.xp6(4),e.Q6J("ngIf",null==m.data?null:m.data.bodyImg),e.xp6(1),e.Q6J("ngIf",null==m.data?null:m.data.info),e.xp6(1),e.Q6J("ngIf",(null==m.data?null:m.data.okBtn)||(null==m.data?null:m.data.cancelBtn)))},dependencies:[_.O5],styles:[".close[_ngcontent-%COMP%]{position:absolute;right:-12px;top:-14px;padding:6px;background-color:#fff;border-radius:50%;cursor:pointer}"]}),n})()},1756:(O,v,g)=>{g.d(v,{a:()=>N});var e=g(4650);var f=(()=>{return(a=f||(f={})).Move="move",a.Resize="resize",a.Pinch="pinch",f;var a})(),A=g(1481),n=g(6895);const l=["wrapper"],s=["sourceImage"];function m(a,p){if(1&a){const t=e.EpF();e.TgZ(0,"img",4,5),e.NdJ("load",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.imageLoadedInView())}),e.qZA()}if(2&a){const t=e.oxw();e.Udp("visibility",t.imageVisible?"visible":"hidden")("transform",t.safeTransformStyle),e.Q6J("src",t.safeImgDataUrl,e.LSH)}}function C(a,p){if(1&a){const t=e.EpF();e.ynx(0),e.TgZ(1,"span",9),e.NdJ("mousedown",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.startMove(o,r.moveTypes.Resize,"topleft"))})("touchstart",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.startMove(o,r.moveTypes.Resize,"topleft"))}),e._UZ(2,"span",10),e.qZA(),e.TgZ(3,"span",11),e._UZ(4,"span",10),e.qZA(),e.TgZ(5,"span",12),e.NdJ("mousedown",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.startMove(o,r.moveTypes.Resize,"topright"))})("touchstart",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.startMove(o,r.moveTypes.Resize,"topright"))}),e._UZ(6,"span",10),e.qZA(),e.TgZ(7,"span",13),e._UZ(8,"span",10),e.qZA(),e.TgZ(9,"span",14),e.NdJ("mousedown",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.startMove(o,r.moveTypes.Resize,"bottomright"))})("touchstart",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.startMove(o,r.moveTypes.Resize,"bottomright"))}),e._UZ(10,"span",10),e.qZA(),e.TgZ(11,"span",15),e._UZ(12,"span",10),e.qZA(),e.TgZ(13,"span",16),e.NdJ("mousedown",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.startMove(o,r.moveTypes.Resize,"bottomleft"))})("touchstart",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.startMove(o,r.moveTypes.Resize,"bottomleft"))}),e._UZ(14,"span",10),e.qZA(),e.TgZ(15,"span",17),e._UZ(16,"span",10),e.qZA(),e.TgZ(17,"span",18),e.NdJ("mousedown",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.startMove(o,r.moveTypes.Resize,"top"))})("touchstart",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.startMove(o,r.moveTypes.Resize,"top"))}),e.qZA(),e.TgZ(18,"span",19),e.NdJ("mousedown",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.startMove(o,r.moveTypes.Resize,"right"))})("touchstart",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.startMove(o,r.moveTypes.Resize,"right"))}),e.qZA(),e.TgZ(19,"span",20),e.NdJ("mousedown",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.startMove(o,r.moveTypes.Resize,"bottom"))})("touchstart",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.startMove(o,r.moveTypes.Resize,"bottom"))}),e.qZA(),e.TgZ(20,"span",21),e.NdJ("mousedown",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.startMove(o,r.moveTypes.Resize,"left"))})("touchstart",function(o){e.CHM(t);const r=e.oxw(2);return e.KtG(r.startMove(o,r.moveTypes.Resize,"left"))}),e.qZA(),e.BQk()}}function X(a,p){if(1&a){const t=e.EpF();e.TgZ(0,"div",6),e.NdJ("keydown",function(o){e.CHM(t);const r=e.oxw();return e.KtG(r.keyboardAccess(o))}),e.TgZ(1,"div",7),e.NdJ("mousedown",function(o){e.CHM(t);const r=e.oxw();return e.KtG(r.startMove(o,r.moveTypes.Move))})("touchstart",function(o){e.CHM(t);const r=e.oxw();return e.KtG(r.startMove(o,r.moveTypes.Move))}),e.qZA(),e.YNc(2,C,21,0,"ng-container",8),e.qZA()}if(2&a){const t=e.oxw();e.Udp("top",t.cropper.y1,"px")("left",t.cropper.x1,"px")("width",t.cropper.x2-t.cropper.x1,"px")("height",t.cropper.y2-t.cropper.y1,"px")("margin-left","center"===t.alignImage?t.marginLeft:null)("visibility",t.imageVisible?"visible":"hidden"),e.ekj("rounded",t.roundCropper),e.xp6(2),e.Q6J("ngIf",!t.hideResizeSquares)}}let N=(()=>{class a{constructor(t,i){this.sanitizer=t,this.cd=i,this.Hammer=typeof window<"u"?window.Hammer:null,this.setImageMaxSizeRetries=0,this.cropperScaledMinWidth=20,this.cropperScaledMinHeight=20,this.exifTransform={rotate:0,flip:!1},this.autoRotateSupported=function _(){return new Promise(a=>{const p=new Image;p.onload=()=>{a(1===p.width&&2===p.height)},p.src="data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/xABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q=="})}(),this.stepSize=3,this.marginLeft="0px",this.imageVisible=!1,this.moveTypes=f,this.format="png",this.maintainAspectRatio=!0,this.transform={},this.aspectRatio=1,this.resizeToWidth=0,this.resizeToHeight=0,this.cropperMinWidth=0,this.cropperMinHeight=0,this.cropperStaticWidth=0,this.cropperStaticHeight=0,this.canvasRotation=0,this.initialStepSize=3,this.roundCropper=!1,this.onlyScaleDown=!1,this.imageQuality=92,this.autoCrop=!0,this.containWithinAspectRatio=!1,this.hideResizeSquares=!1,this.cropper={x1:-100,y1:-100,x2:1e4,y2:1e4},this.alignImage="center",this.disabled=!1,this.imageCropped=new e.vpe,this.startCropImage=new e.vpe,this.imageLoaded=new e.vpe,this.cropperReady=new e.vpe,this.loadImageFailed=new e.vpe,this.initCropper()}ngOnChanges(t){this.cropperStaticHeight&&this.cropperStaticWidth&&(this.hideResizeSquares=!0,this.cropperMinWidth=this.cropperStaticWidth,this.cropperMinHeight=this.cropperStaticHeight,this.maintainAspectRatio=!1),this.onChangesInputImage(t),this.originalImage&&this.originalImage.complete&&this.exifTransform&&(t.containWithinAspectRatio||t.canvasRotation)&&this.transformOriginalImage(),t.cropper&&(this.setMaxSize(),this.setCropperScaledMinSize(),this.checkCropperPosition(!1),this.doAutoCrop(),this.cd.markForCheck()),t.aspectRatio&&this.imageVisible&&this.resetCropperPosition(),t.transform&&(this.transform=this.transform||{},this.setCssTransform(),this.doAutoCrop())}onChangesInputImage(t){(t.imageChangedEvent||t.imageURL||t.imageBase64||t.imageFile)&&this.initCropper(),t.imageChangedEvent&&this.isValidImageChangedEvent()&&this.loadImageFile(this.imageChangedEvent.target.files[0]),t.imageURL&&this.imageURL&&this.loadImageFromURL(this.imageURL),t.imageBase64&&this.imageBase64&&this.loadBase64Image(this.imageBase64),t.imageFile&&this.imageFile&&this.loadImageFile(this.imageFile)}isValidImageChangedEvent(){return this.imageChangedEvent&&this.imageChangedEvent.target&&this.imageChangedEvent.target.files&&this.imageChangedEvent.target.files.length>0}setCssTransform(){this.safeTransformStyle=this.sanitizer.bypassSecurityTrustStyle("scaleX("+(this.transform.scale||1)*(this.transform.flipH?-1:1)+")scaleY("+(this.transform.scale||1)*(this.transform.flipV?-1:1)+")rotate("+(this.transform.rotate||0)+"deg)")}ngOnInit(){this.stepSize=this.initialStepSize,this.activatePinchGesture()}initCropper(){this.imageVisible=!1,this.transformedImage=null,this.safeImgDataUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=",this.moveStart={active:!1,type:null,position:null,x1:0,y1:0,x2:0,y2:0,clientX:0,clientY:0},this.maxSize={width:0,height:0},this.originalSize={width:0,height:0},this.transformedSize={width:0,height:0},this.cropper.x1=-100,this.cropper.y1=-100,this.cropper.x2=1e4,this.cropper.y2=1e4}loadImage(t,i){this.isValidImageType(i)?this.loadBase64Image(t):this.loadImageFailed.emit()}loadImageFile(t){const i=new FileReader;i.onload=o=>this.loadImage(o.target.result,t.type),i.readAsDataURL(t)}isValidImageType(t){return/image\/(png|jpg|jpeg|bmp|gif|tiff|webp)/.test(t)}loadBase64Image(t){this.autoRotateSupported.then(i=>this.checkExifAndLoadBase64Image(t,i)).then(()=>this.transformOriginalImage()).catch(i=>{this.loadImageFailed.emit(),this.originalImage=null,this.originalBase64=null,console.error(i)})}checkExifAndLoadBase64Image(t,i){return new Promise((o,r)=>{this.originalImage=new Image,this.originalImage.onload=()=>{this.originalBase64=t,this.exifTransform=function u(a){switch("string"==typeof a&&(a=function y(a){const p=new DataView(function x(a){a=a.replace(/^data\:([^\;]+)\;base64,/gim,"");const p=atob(a),t=p.length,i=new Uint8Array(t);for(let o=0;o<t;o++)i[o]=p.charCodeAt(o);return i.buffer}(a));if(65496!=p.getUint16(0,!1))return-2;const t=p.byteLength;let i=2;for(;i<t;){if(p.getUint16(i+2,!1)<=8)return-1;const o=p.getUint16(i,!1);if(i+=2,65505==o){if(1165519206!=p.getUint32(i+=2,!1))return-1;const r=18761==p.getUint16(i+=6,!1);i+=p.getUint32(i+4,r);const h=p.getUint16(i,r);i+=2;for(let c=0;c<h;c++)if(274==p.getUint16(i+12*c,r))return p.getUint16(i+12*c+8,r)}else{if(65280!=(65280&o))break;i+=p.getUint16(i,!1)}}return-1}(a)),a){case 2:return{rotate:0,flip:!0};case 3:return{rotate:2,flip:!1};case 4:return{rotate:2,flip:!0};case 5:return{rotate:1,flip:!0};case 6:return{rotate:1,flip:!1};case 7:return{rotate:3,flip:!0};case 8:return{rotate:3,flip:!1};default:return{rotate:0,flip:!1}}}(i?-1:t),this.originalSize.width=this.originalImage.naturalWidth,this.originalSize.height=this.originalImage.naturalHeight,o()},this.originalImage.onerror=r,this.originalImage.src=t})}loadImageFromURL(t){const i=new Image;i.onerror=()=>this.loadImageFailed.emit(),i.onload=()=>{const o=document.createElement("canvas"),r=o.getContext("2d");o.width=i.width,o.height=i.height,r.drawImage(i,0,0),this.loadBase64Image(o.toDataURL())},i.crossOrigin="anonymous",i.src=t}transformOriginalImage(){if(!this.originalImage||!this.originalImage.complete||!this.exifTransform)return Promise.reject(new Error("No image loaded"));const t=this.transformImageBase64();return this.setTransformedImage(t)}transformImageBase64(){const t=this.canvasRotation+this.exifTransform.rotate;if(0===t&&!this.exifTransform.flip&&!this.containWithinAspectRatio)return this.originalBase64;const i=this.getTransformedSize(),o=document.createElement("canvas");o.width=i.width,o.height=i.height;const r=o.getContext("2d");return r.setTransform(this.exifTransform.flip?-1:1,0,0,1,o.width/2,o.height/2),r.rotate(Math.PI*(t/2)),r.drawImage(this.originalImage,-this.originalSize.width/2,-this.originalSize.height/2),o.toDataURL()}getTransformedSize(){const t=this.canvasRotation+this.exifTransform.rotate;if(this.containWithinAspectRatio){if(t%2){const o=this.originalSize.height/this.aspectRatio;return{width:Math.max(this.originalSize.height,this.originalSize.width*this.aspectRatio),height:Math.max(this.originalSize.width,o)}}{const o=this.originalSize.width/this.aspectRatio;return{width:Math.max(this.originalSize.width,this.originalSize.height*this.aspectRatio),height:Math.max(this.originalSize.height,o)}}}return t%2?{height:this.originalSize.width,width:this.originalSize.height}:{width:this.originalSize.width,height:this.originalSize.height}}setTransformedImage(t){return new Promise(i=>{this.transformedBase64=t,this.safeImgDataUrl=this.sanitizer.bypassSecurityTrustResourceUrl(t),this.transformedImage=new Image,this.transformedImage.onload=()=>{this.transformedSize.width=this.transformedImage.naturalWidth,this.transformedSize.height=this.transformedImage.naturalHeight,this.cd.markForCheck(),i()},this.transformedImage.src=this.transformedBase64})}imageLoadedInView(){null!=this.transformedImage&&(this.imageLoaded.emit(),this.setImageMaxSizeRetries=0,setTimeout(()=>this.checkImageMaxSizeRecursively()))}checkImageMaxSizeRecursively(){this.setImageMaxSizeRetries>40?this.loadImageFailed.emit():this.sourceImageLoaded()?(this.setMaxSize(),this.setCropperScaledMinSize(),this.resetCropperPosition(),this.cropperReady.emit({...this.maxSize}),this.cd.markForCheck()):(this.setImageMaxSizeRetries++,setTimeout(()=>this.checkImageMaxSizeRecursively(),50))}sourceImageLoaded(){return this.sourceImage&&this.sourceImage.nativeElement&&this.sourceImage.nativeElement.offsetWidth>0}onResize(){this.resizeCropperPosition(),this.setMaxSize(),this.setCropperScaledMinSize()}activatePinchGesture(){this.Hammer?new this.Hammer(this.wrapper.nativeElement).get("pinch").set({enable:!0}):(0,e.X6Q)()&&console.warn("[NgxImageCropper] Could not find HammerJS - Pinch Gesture won't work")}resizeCropperPosition(){const t=this.sourceImage.nativeElement;(this.maxSize.width!==t.offsetWidth||this.maxSize.height!==t.offsetHeight)&&(this.cropper.x1=this.cropper.x1*t.offsetWidth/this.maxSize.width,this.cropper.x2=this.cropper.x2*t.offsetWidth/this.maxSize.width,this.cropper.y1=this.cropper.y1*t.offsetHeight/this.maxSize.height,this.cropper.y2=this.cropper.y2*t.offsetHeight/this.maxSize.height)}resetCropperPosition(){const t=this.sourceImage.nativeElement;if(this.cropperStaticHeight&&this.cropperStaticWidth)this.cropper.x1=0,this.cropper.x2=t.offsetWidth>this.cropperStaticWidth?this.cropperStaticWidth:t.offsetWidth,this.cropper.y1=0,this.cropper.y2=t.offsetHeight>this.cropperStaticHeight?this.cropperStaticHeight:t.offsetHeight;else if(this.maintainAspectRatio)if(t.offsetWidth/this.aspectRatio<t.offsetHeight){this.cropper.x1=0,this.cropper.x2=t.offsetWidth;const i=t.offsetWidth/this.aspectRatio;this.cropper.y1=(t.offsetHeight-i)/2,this.cropper.y2=this.cropper.y1+i}else{this.cropper.y1=0,this.cropper.y2=t.offsetHeight;const i=t.offsetHeight*this.aspectRatio;this.cropper.x1=(t.offsetWidth-i)/2,this.cropper.x2=this.cropper.x1+i}else this.cropper.x1=0,this.cropper.x2=t.offsetWidth,this.cropper.y1=0,this.cropper.y2=t.offsetHeight;this.doAutoCrop(),this.imageVisible=!0}keyboardAccess(t){this.changeKeyboardStepSize(t),this.keyboardMoveCropper(t)}changeKeyboardStepSize(t){t.key>="1"&&t.key<="9"&&(this.stepSize=+t.key)}keyboardMoveCropper(t){if(!["ArrowUp","ArrowDown","ArrowRight","ArrowLeft"].includes(t.key))return;const o=t.shiftKey?f.Resize:f.Move,r=t.altKey?this.getInvertedPositionForKey(t.key):this.getPositionForKey(t.key),h=this.getEventForKey(t.key,this.stepSize);t.preventDefault(),t.stopPropagation(),this.startMove({clientX:0,clientY:0},o,r),this.moveImg(h),this.moveStop()}getPositionForKey(t){switch(t){case"ArrowUp":return"top";case"ArrowRight":return"right";case"ArrowDown":return"bottom";default:return"left"}}getInvertedPositionForKey(t){switch(t){case"ArrowUp":return"bottom";case"ArrowRight":return"left";case"ArrowDown":return"top";default:return"right"}}getEventForKey(t,i){switch(t){case"ArrowUp":return{clientX:0,clientY:-1*i};case"ArrowRight":return{clientX:i,clientY:0};case"ArrowDown":return{clientX:0,clientY:i};default:return{clientX:-1*i,clientY:0}}}startMove(t,i,o=null){this.moveStart&&this.moveStart.active&&this.moveStart.type===f.Pinch||(t.preventDefault&&t.preventDefault(),this.moveStart={active:!0,type:i,position:o,clientX:this.getClientX(t),clientY:this.getClientY(t),...this.cropper})}startPinch(t){!this.safeImgDataUrl||(t.preventDefault&&t.preventDefault(),this.moveStart={active:!0,type:f.Pinch,position:"center",clientX:this.cropper.x1+(this.cropper.x2-this.cropper.x1)/2,clientY:this.cropper.y1+(this.cropper.y2-this.cropper.y1)/2,...this.cropper})}moveImg(t){this.moveStart.active&&(t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault(),this.moveStart.type===f.Move?(this.move(t),this.checkCropperPosition(!0)):this.moveStart.type===f.Resize&&(!this.cropperStaticWidth&&!this.cropperStaticHeight&&this.resize(t),this.checkCropperPosition(!1)),this.cd.detectChanges())}onPinch(t){this.moveStart.active&&(t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault(),this.moveStart.type===f.Pinch&&(this.resize(t),this.checkCropperPosition(!1)),this.cd.detectChanges())}setMaxSize(){if(this.sourceImage){const t=this.sourceImage.nativeElement;this.maxSize.width=t.offsetWidth,this.maxSize.height=t.offsetHeight,this.marginLeft=this.sanitizer.bypassSecurityTrustStyle("calc(50% - "+this.maxSize.width/2+"px)")}}setCropperScaledMinSize(){this.transformedImage?(this.setCropperScaledMinWidth(),this.setCropperScaledMinHeight()):(this.cropperScaledMinWidth=20,this.cropperScaledMinHeight=20)}setCropperScaledMinWidth(){this.cropperScaledMinWidth=this.cropperMinWidth>0?Math.max(20,this.cropperMinWidth/this.transformedImage.width*this.maxSize.width):20}setCropperScaledMinHeight(){this.cropperScaledMinHeight=this.maintainAspectRatio?Math.max(20,this.cropperScaledMinWidth/this.aspectRatio):this.cropperMinHeight>0?Math.max(20,this.cropperMinHeight/this.transformedImage.height*this.maxSize.height):20}checkCropperPosition(t=!1){this.cropper.x1<0&&(this.cropper.x2-=t?this.cropper.x1:0,this.cropper.x1=0),this.cropper.y1<0&&(this.cropper.y2-=t?this.cropper.y1:0,this.cropper.y1=0),this.cropper.x2>this.maxSize.width&&(this.cropper.x1-=t?this.cropper.x2-this.maxSize.width:0,this.cropper.x2=this.maxSize.width),this.cropper.y2>this.maxSize.height&&(this.cropper.y1-=t?this.cropper.y2-this.maxSize.height:0,this.cropper.y2=this.maxSize.height)}moveStop(){this.moveStart.active&&(this.moveStart.active=!1,this.doAutoCrop())}pinchStop(){this.moveStart.active&&(this.moveStart.active=!1,this.doAutoCrop())}move(t){const i=this.getClientX(t)-this.moveStart.clientX,o=this.getClientY(t)-this.moveStart.clientY;this.cropper.x1=this.moveStart.x1+i,this.cropper.y1=this.moveStart.y1+o,this.cropper.x2=this.moveStart.x2+i,this.cropper.y2=this.moveStart.y2+o}resize(t){const i=this.getClientX(t)-this.moveStart.clientX,o=this.getClientY(t)-this.moveStart.clientY;switch(this.moveStart.position){case"left":this.cropper.x1=Math.min(this.moveStart.x1+i,this.cropper.x2-this.cropperScaledMinWidth);break;case"topleft":this.cropper.x1=Math.min(this.moveStart.x1+i,this.cropper.x2-this.cropperScaledMinWidth),this.cropper.y1=Math.min(this.moveStart.y1+o,this.cropper.y2-this.cropperScaledMinHeight);break;case"top":this.cropper.y1=Math.min(this.moveStart.y1+o,this.cropper.y2-this.cropperScaledMinHeight);break;case"topright":this.cropper.x2=Math.max(this.moveStart.x2+i,this.cropper.x1+this.cropperScaledMinWidth),this.cropper.y1=Math.min(this.moveStart.y1+o,this.cropper.y2-this.cropperScaledMinHeight);break;case"right":this.cropper.x2=Math.max(this.moveStart.x2+i,this.cropper.x1+this.cropperScaledMinWidth);break;case"bottomright":this.cropper.x2=Math.max(this.moveStart.x2+i,this.cropper.x1+this.cropperScaledMinWidth),this.cropper.y2=Math.max(this.moveStart.y2+o,this.cropper.y1+this.cropperScaledMinHeight);break;case"bottom":this.cropper.y2=Math.max(this.moveStart.y2+o,this.cropper.y1+this.cropperScaledMinHeight);break;case"bottomleft":this.cropper.x1=Math.min(this.moveStart.x1+i,this.cropper.x2-this.cropperScaledMinWidth),this.cropper.y2=Math.max(this.moveStart.y2+o,this.cropper.y1+this.cropperScaledMinHeight);break;case"center":const r=t.scale,h=Math.abs(this.moveStart.x2-this.moveStart.x1)*r,c=Math.abs(this.moveStart.y2-this.moveStart.y1)*r,S=this.cropper.x1,d=this.cropper.y1;this.cropper.x1=Math.min(this.moveStart.clientX-h/2,this.cropper.x2-this.cropperScaledMinWidth),this.cropper.y1=Math.min(this.moveStart.clientY-c/2,this.cropper.y2-this.cropperScaledMinHeight),this.cropper.x2=Math.max(this.moveStart.clientX+h/2,S+this.cropperScaledMinWidth),this.cropper.y2=Math.max(this.moveStart.clientY+c/2,d+this.cropperScaledMinHeight)}this.maintainAspectRatio&&this.checkAspectRatio()}checkAspectRatio(){let t=0,i=0;switch(this.moveStart.position){case"top":this.cropper.x2=this.cropper.x1+(this.cropper.y2-this.cropper.y1)*this.aspectRatio,t=Math.max(this.cropper.x2-this.maxSize.width,0),i=Math.max(0-this.cropper.y1,0),(t>0||i>0)&&(this.cropper.x2-=i*this.aspectRatio>t?i*this.aspectRatio:t,this.cropper.y1+=i*this.aspectRatio>t?i:t/this.aspectRatio);break;case"bottom":this.cropper.x2=this.cropper.x1+(this.cropper.y2-this.cropper.y1)*this.aspectRatio,t=Math.max(this.cropper.x2-this.maxSize.width,0),i=Math.max(this.cropper.y2-this.maxSize.height,0),(t>0||i>0)&&(this.cropper.x2-=i*this.aspectRatio>t?i*this.aspectRatio:t,this.cropper.y2-=i*this.aspectRatio>t?i:t/this.aspectRatio);break;case"topleft":this.cropper.y1=this.cropper.y2-(this.cropper.x2-this.cropper.x1)/this.aspectRatio,t=Math.max(0-this.cropper.x1,0),i=Math.max(0-this.cropper.y1,0),(t>0||i>0)&&(this.cropper.x1+=i*this.aspectRatio>t?i*this.aspectRatio:t,this.cropper.y1+=i*this.aspectRatio>t?i:t/this.aspectRatio);break;case"topright":this.cropper.y1=this.cropper.y2-(this.cropper.x2-this.cropper.x1)/this.aspectRatio,t=Math.max(this.cropper.x2-this.maxSize.width,0),i=Math.max(0-this.cropper.y1,0),(t>0||i>0)&&(this.cropper.x2-=i*this.aspectRatio>t?i*this.aspectRatio:t,this.cropper.y1+=i*this.aspectRatio>t?i:t/this.aspectRatio);break;case"right":case"bottomright":this.cropper.y2=this.cropper.y1+(this.cropper.x2-this.cropper.x1)/this.aspectRatio,t=Math.max(this.cropper.x2-this.maxSize.width,0),i=Math.max(this.cropper.y2-this.maxSize.height,0),(t>0||i>0)&&(this.cropper.x2-=i*this.aspectRatio>t?i*this.aspectRatio:t,this.cropper.y2-=i*this.aspectRatio>t?i:t/this.aspectRatio);break;case"left":case"bottomleft":this.cropper.y2=this.cropper.y1+(this.cropper.x2-this.cropper.x1)/this.aspectRatio,t=Math.max(0-this.cropper.x1,0),i=Math.max(this.cropper.y2-this.maxSize.height,0),(t>0||i>0)&&(this.cropper.x1+=i*this.aspectRatio>t?i*this.aspectRatio:t,this.cropper.y2-=i*this.aspectRatio>t?i:t/this.aspectRatio);break;case"center":this.cropper.x2=this.cropper.x1+(this.cropper.y2-this.cropper.y1)*this.aspectRatio,this.cropper.y2=this.cropper.y1+(this.cropper.x2-this.cropper.x1)/this.aspectRatio;const o=Math.max(0-this.cropper.x1,0),r=Math.max(this.cropper.x2-this.maxSize.width,0),h=Math.max(this.cropper.y2-this.maxSize.height,0),c=Math.max(0-this.cropper.y1,0);(o>0||r>0||h>0||c>0)&&(this.cropper.x1+=h*this.aspectRatio>o?h*this.aspectRatio:o,this.cropper.x2-=c*this.aspectRatio>r?c*this.aspectRatio:r,this.cropper.y1+=c*this.aspectRatio>r?c:r/this.aspectRatio,this.cropper.y2-=h*this.aspectRatio>o?h:o/this.aspectRatio)}}doAutoCrop(){this.autoCrop&&this.crop()}crop(){if(this.sourceImage&&this.sourceImage.nativeElement&&null!=this.transformedImage){this.startCropImage.emit();const t=this.getImagePosition(),i=t.x2-t.x1,o=t.y2-t.y1,r=document.createElement("canvas");r.width=i,r.height=o;const h=r.getContext("2d");if(h){null!=this.backgroundColor&&(h.fillStyle=this.backgroundColor,h.fillRect(0,0,i,o));const c=(this.transform.scale||1)*(this.transform.flipH?-1:1),S=(this.transform.scale||1)*(this.transform.flipV?-1:1);h.setTransform(c,0,0,S,this.transformedSize.width/2,this.transformedSize.height/2),h.translate(-t.x1/c,-t.y1/S),h.rotate((this.transform.rotate||0)*Math.PI/180),h.drawImage(this.transformedImage,-this.transformedSize.width/2,-this.transformedSize.height/2);const d={width:i,height:o,imagePosition:t,cropperPosition:{...this.cropper}};this.containWithinAspectRatio&&(d.offsetImagePosition=this.getOffsetImagePosition());const E=this.getResizeRatio(i,o);return 1!==E&&(d.width=Math.round(i*E),d.height=this.maintainAspectRatio?Math.round(d.width/this.aspectRatio):Math.round(o*E),function T(a,p,t){const i=a.width,o=a.height,r=i/(p=Math.round(p)),h=o/(t=Math.round(t)),c=Math.ceil(r/2),S=Math.ceil(h/2),d=a.getContext("2d");if(d){const E=d.getImageData(0,0,i,o),Z=d.createImageData(p,t),I=E.data,H=Z.data;for(let z=0;z<t;z++)for(let b=0;b<p;b++){const B=4*(b+z*p),V=z*h;let w=0,k=0,D=0,L=0,K=0,Y=0,G=0;const j=Math.floor(b*r),$=Math.floor(z*h);let F=Math.ceil((b+1)*r),U=Math.ceil((z+1)*h);F=Math.min(F,i),U=Math.min(U,o);for(let Q=$;Q<U;Q++){const J=Math.abs(V-Q)/S,tt=b*r,et=J*J;for(let W=j;W<F;W++){const q=Math.abs(tt-W)/c,R=Math.sqrt(et+q*q);if(R>=1)continue;w=2*R*R*R-3*R*R+1;const P=4*(W+Q*i);G+=w*I[P+3],D+=w,I[P+3]<255&&(w=w*I[P+3]/250),L+=w*I[P],K+=w*I[P+1],Y+=w*I[P+2],k+=w}}H[B]=L/k,H[B+1]=K/k,H[B+2]=Y/k,H[B+3]=G/D}a.width=p,a.height=t,d.putImageData(Z,0,0)}}(r,d.width,d.height)),d.base64=this.cropToBase64(r),this.imageCropped.emit(d),d}}return null}getImagePosition(){const i=this.transformedSize.width/this.sourceImage.nativeElement.offsetWidth,o={x1:Math.round(this.cropper.x1*i),y1:Math.round(this.cropper.y1*i),x2:Math.round(this.cropper.x2*i),y2:Math.round(this.cropper.y2*i)};return this.containWithinAspectRatio||(o.x1=Math.max(o.x1,0),o.y1=Math.max(o.y1,0),o.x2=Math.min(o.x2,this.transformedSize.width),o.y2=Math.min(o.y2,this.transformedSize.height)),o}getOffsetImagePosition(){const o=this.transformedSize.width/this.sourceImage.nativeElement.offsetWidth;let r,h;(this.canvasRotation+this.exifTransform.rotate)%2?(r=(this.transformedSize.width-this.originalSize.height)/2,h=(this.transformedSize.height-this.originalSize.width)/2):(r=(this.transformedSize.width-this.originalSize.width)/2,h=(this.transformedSize.height-this.originalSize.height)/2);const c={x1:Math.round(this.cropper.x1*o)-r,y1:Math.round(this.cropper.y1*o)-h,x2:Math.round(this.cropper.x2*o)-r,y2:Math.round(this.cropper.y2*o)-h};return this.containWithinAspectRatio||(c.x1=Math.max(c.x1,0),c.y1=Math.max(c.y1,0),c.x2=Math.min(c.x2,this.transformedSize.width),c.y2=Math.min(c.y2,this.transformedSize.height)),c}cropToBase64(t){return t.toDataURL("image/"+this.format,this.getQuality())}getQuality(){return Math.min(1,Math.max(0,this.imageQuality/100))}getResizeRatio(t,i){const o=this.resizeToWidth/t,r=this.resizeToHeight/i,h=new Array;this.resizeToWidth>0&&h.push(o),this.resizeToHeight>0&&h.push(r);const c=0===h.length?1:Math.min(...h);return c>1&&!this.onlyScaleDown?c:Math.min(c,1)}getClientX(t){return(t.touches&&t.touches[0]?t.touches[0].clientX:t.clientX)||0}getClientY(t){return(t.touches&&t.touches[0]?t.touches[0].clientY:t.clientY)||0}}return a.\u0275fac=function(t){return new(t||a)(e.Y36(A.H7),e.Y36(e.sBO))},a.\u0275cmp=e.Xpm({type:a,selectors:[["image-cropper"]],viewQuery:function(t,i){if(1&t&&(e.Gf(l,7),e.Gf(s,5)),2&t){let o;e.iGM(o=e.CRH())&&(i.wrapper=o.first),e.iGM(o=e.CRH())&&(i.sourceImage=o.first)}},hostVars:4,hostBindings:function(t,i){1&t&&e.NdJ("resize",function(){return i.onResize()},!1,e.Jf7)("mousemove",function(r){return i.moveImg(r)},!1,e.evT)("touchmove",function(r){return i.moveImg(r)},!1,e.evT)("mouseup",function(){return i.moveStop()},!1,e.evT)("touchend",function(){return i.moveStop()},!1,e.evT),2&t&&(e.Udp("text-align",i.alignImage),e.ekj("disabled",i.disabled))},inputs:{imageChangedEvent:"imageChangedEvent",imageURL:"imageURL",imageBase64:"imageBase64",imageFile:"imageFile",format:"format",maintainAspectRatio:"maintainAspectRatio",transform:"transform",aspectRatio:"aspectRatio",resizeToWidth:"resizeToWidth",resizeToHeight:"resizeToHeight",cropperMinWidth:"cropperMinWidth",cropperMinHeight:"cropperMinHeight",cropperStaticWidth:"cropperStaticWidth",cropperStaticHeight:"cropperStaticHeight",canvasRotation:"canvasRotation",initialStepSize:"initialStepSize",roundCropper:"roundCropper",onlyScaleDown:"onlyScaleDown",imageQuality:"imageQuality",autoCrop:"autoCrop",backgroundColor:"backgroundColor",containWithinAspectRatio:"containWithinAspectRatio",hideResizeSquares:"hideResizeSquares",cropper:"cropper",alignImage:"alignImage",disabled:"disabled"},outputs:{imageCropped:"imageCropped",startCropImage:"startCropImage",imageLoaded:"imageLoaded",cropperReady:"cropperReady",loadImageFailed:"loadImageFailed"},features:[e.TTD],decls:5,vars:10,consts:[["wrapper",""],["class","source-image",3,"src","visibility","transform","load",4,"ngIf"],[1,"overlay"],["class","cropper","tabindex","0",3,"rounded","top","left","width","height","margin-left","visibility","keydown",4,"ngIf"],[1,"source-image",3,"src","load"],["sourceImage",""],["tabindex","0",1,"cropper",3,"keydown"],[1,"move",3,"mousedown","touchstart"],[4,"ngIf"],[1,"resize","topleft",3,"mousedown","touchstart"],[1,"square"],[1,"resize","top"],[1,"resize","topright",3,"mousedown","touchstart"],[1,"resize","right"],[1,"resize","bottomright",3,"mousedown","touchstart"],[1,"resize","bottom"],[1,"resize","bottomleft",3,"mousedown","touchstart"],[1,"resize","left"],[1,"resize-bar","top",3,"mousedown","touchstart"],[1,"resize-bar","right",3,"mousedown","touchstart"],[1,"resize-bar","bottom",3,"mousedown","touchstart"],[1,"resize-bar","left",3,"mousedown","touchstart"]],template:function(t,i){1&t&&(e.TgZ(0,"div",null,0),e.YNc(2,m,2,5,"img",1),e._UZ(3,"div",2),e.YNc(4,X,3,15,"div",3),e.qZA()),2&t&&(e.Udp("background",i.imageVisible&&i.backgroundColor),e.xp6(2),e.Q6J("ngIf",i.safeImgDataUrl),e.xp6(1),e.Udp("width",i.maxSize.width,"px")("height",i.maxSize.height,"px")("margin-left","center"===i.alignImage?i.marginLeft:null),e.xp6(1),e.Q6J("ngIf",i.imageVisible))},dependencies:[n.O5],styles:['[_nghost-%COMP%]{display:flex;position:relative;width:100%;max-width:100%;max-height:100%;overflow:hidden;padding:5px;text-align:center}[_nghost-%COMP%] > div[_ngcontent-%COMP%]{width:100%;position:relative}[_nghost-%COMP%] > div[_ngcontent-%COMP%]   img.source-image[_ngcontent-%COMP%]{max-width:100%;max-height:100%;transform-origin:center}[_nghost-%COMP%]   .overlay[_ngcontent-%COMP%]{position:absolute;pointer-events:none;touch-action:none;outline:white solid 100vw;top:0;left:0}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]{position:absolute;display:flex;color:#53535c;background:transparent;outline:rgba(255,255,255,.3) solid 100vw;outline:var(--cropper-outline-color, rgba(255, 255, 255, .3)) solid 100vw;touch-action:none}@media (orientation: portrait){[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]{outline-width:100vh}}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]:after{position:absolute;content:"";inset:0;pointer-events:none;border:dashed 1px;opacity:.75;color:inherit;z-index:1}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .move[_ngcontent-%COMP%]{width:100%;cursor:move;border:1px solid rgba(255,255,255,.5)}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]:focus   .move[_ngcontent-%COMP%]{border-color:#1e90ff;border-width:2px}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize[_ngcontent-%COMP%]{position:absolute;display:inline-block;line-height:6px;padding:8px;opacity:.85;z-index:1}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize[_ngcontent-%COMP%]   .square[_ngcontent-%COMP%]{display:inline-block;background:#53535C;width:6px;height:6px;border:1px solid rgba(255,255,255,.5);box-sizing:content-box}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.topleft[_ngcontent-%COMP%]{top:-12px;left:-12px;cursor:nwse-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.top[_ngcontent-%COMP%]{top:-12px;left:calc(50% - 12px);cursor:ns-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.topright[_ngcontent-%COMP%]{top:-12px;right:-12px;cursor:nesw-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.right[_ngcontent-%COMP%]{top:calc(50% - 12px);right:-12px;cursor:ew-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.bottomright[_ngcontent-%COMP%]{bottom:-12px;right:-12px;cursor:nwse-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.bottom[_ngcontent-%COMP%]{bottom:-12px;left:calc(50% - 12px);cursor:ns-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.bottomleft[_ngcontent-%COMP%]{bottom:-12px;left:-12px;cursor:nesw-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.left[_ngcontent-%COMP%]{top:calc(50% - 12px);left:-12px;cursor:ew-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar[_ngcontent-%COMP%]{position:absolute;z-index:1}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar.top[_ngcontent-%COMP%]{top:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:ns-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar.right[_ngcontent-%COMP%]{top:11px;right:-11px;height:calc(100% - 22px);width:22px;cursor:ew-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar.bottom[_ngcontent-%COMP%]{bottom:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:ns-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar.left[_ngcontent-%COMP%]{top:11px;left:-11px;height:calc(100% - 22px);width:22px;cursor:ew-resize}[_nghost-%COMP%]   .cropper.rounded[_ngcontent-%COMP%]{outline-color:transparent}[_nghost-%COMP%]   .cropper.rounded[_ngcontent-%COMP%]:after{border-radius:100%;box-shadow:0 0 0 100vw #ffffff4d;box-shadow:0 0 0 100vw var(--cropper-outline-color, rgba(255, 255, 255, .3))}@media (orientation: portrait){[_nghost-%COMP%]   .cropper.rounded[_ngcontent-%COMP%]:after{box-shadow:0 0 0 100vh #ffffff4d;box-shadow:0 0 0 100vh var(--cropper-outline-color, rgba(255, 255, 255, .3))}}[_nghost-%COMP%]   .cropper.rounded[_ngcontent-%COMP%]   .move[_ngcontent-%COMP%]{border-radius:100%}.disabled[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize[_ngcontent-%COMP%], .disabled[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar[_ngcontent-%COMP%], .disabled[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .move[_ngcontent-%COMP%]{display:none}'],changeDetection:0}),a})()},6245:(O,v,g)=>{g.d(v,{Q:()=>_});var e=g(6895),M=g(4650);let _=(()=>{class u{}return u.\u0275fac=function(x){return new(x||u)},u.\u0275mod=M.oAB({type:u}),u.\u0275inj=M.cJS({imports:[e.ez]}),u})()},803:(O,v,g)=>{function e(M,_){return u=>{const x=u.controls[_];x.errors&&!x.errors.confirmedValidator||x.setErrors(u.controls[M].value!==x.value?{confirmedValidator:!0}:null)}}g.d(v,{Z:()=>e})},6406:(O,v,g)=>{g.d(v,{Z:()=>T});var e=g(4408),M=g(727);const _={schedule(A){let n=requestAnimationFrame,l=cancelAnimationFrame;const{delegate:s}=_;s&&(n=s.requestAnimationFrame,l=s.cancelAnimationFrame);const m=n(C=>{l=void 0,A(C)});return new M.w0(()=>l?.(m))},requestAnimationFrame(...A){const{delegate:n}=_;return(n?.requestAnimationFrame||requestAnimationFrame)(...A)},cancelAnimationFrame(...A){const{delegate:n}=_;return(n?.cancelAnimationFrame||cancelAnimationFrame)(...A)},delegate:void 0};var y=g(7565);const T=new class x extends y.v{flush(n){this._active=!0;const l=this._scheduled;this._scheduled=void 0;const{actions:s}=this;let m;n=n||s.shift();do{if(m=n.execute(n.state,n.delay))break}while((n=s[0])&&n.id===l&&s.shift());if(this._active=!1,m){for(;(n=s[0])&&n.id===l&&s.shift();)n.unsubscribe();throw m}}}(class u extends e.o{constructor(n,l){super(n,l),this.scheduler=n,this.work=l}requestAsyncId(n,l,s=0){return null!==s&&s>0?super.requestAsyncId(n,l,s):(n.actions.push(this),n._scheduled||(n._scheduled=_.requestAnimationFrame(()=>n.flush(void 0))))}recycleAsyncId(n,l,s=0){var m;if(null!=s?s>0:this.delay>0)return super.recycleAsyncId(n,l,s);const{actions:C}=n;null!=l&&(null===(m=C[C.length-1])||void 0===m?void 0:m.id)!==l&&(_.cancelAnimationFrame(l),n._scheduled=void 0)}})}}]);