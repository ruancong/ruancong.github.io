import{_ as U,g as a,h as D,o as i,c,b as t,n as M,t as P,i as y,F as R}from"./app-BoHEVF67.js";const E=async(r,o={})=>{const s=new URLSearchParams;Object.entries(o).forEach(([e,n])=>{s.append(e,n)});try{const e=await fetch(r,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:s});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return await e.json()}catch(e){throw console.error("请求出错:",e),e}},O="https://vpn.ruancong130.workers.dev/?url=",T={WORD_QUERY:`${O}${encodeURIComponent("https://dict.youdao.com/jsonapi_s?doctype=json&jsonversion=4")}`},b=async r=>await E(T.WORD_QUERY,{q:r}),j={__name:"VocabularyAudio",props:{vocabulary:{type:String,required:!0}},setup(r,{expose:o}){o();const s=a(null),e=`https://dict.youdao.com/dictvoice?type=1&audio=${r.vocabulary}`,n=a(!1),d=a(!1),u=a(!1),p=a(null),v=a(null),m=a("此单词暂无多媒体数据"),k=D(()=>!p.value&&!v.value&&u.value),f={audioElement:s,audioUrl:e,mediaIsLoading:n,isMore:d,isMediaLoaded:u,videoUrl:p,picDict:v,noDataTip:m,isNoMediaData:k,togglePlay:()=>{s.value.paused?s.value.play():(s.value.pause(),s.value.currentTime=0)},toggleMore:async()=>{var _,g,w,x,h;if(d.value=!d.value,!u.value&&d.value){n.value=!0;try{const l=await b(r.vocabulary);console.log(l),p.value=(w=(g=(_=l.word_video)==null?void 0:_.word_videos[0])==null?void 0:g.video)==null?void 0:w.url,v.value=(h=(x=l.pic_dict)==null?void 0:x.pic[0])==null?void 0:h.url}catch(l){l instanceof TypeError&&l.message==="Failed to fetch"?m.value="你的网络可能需要梯子":m.value="获取单词信息失败"}finally{n.value=!1,u.value=!0}}},ref:a,computed:D,get getWordInfo(){return b}};return Object.defineProperty(f,"__isScriptSetup",{enumerable:!1,value:!0}),f}},C={class:"flex items-center"},I={key:0},S={key:1},A={key:0},L={class:"text-orange-500"},V={key:1},W=["src"],F={key:2},N=["src"];function Y(r,o,s,e,n,d){return i(),c(R,null,[o[5]||(o[5]=t("h4",null,"单词多媒体信息:",-1)),t("div",C,[o[0]||(o[0]=t("span",null,"美音: ",-1)),t("div",{class:"ml-2 text-orange-500 text-5 active:opacity-50","i-material-symbols-volume-up-rounded":"",onClick:e.togglePlay},[t("audio",{ref:"audioElement",src:e.audioUrl,style:{display:"none"}},null,512)])]),t("div",{class:"flex items-center",onClick:e.toggleMore},[o[1]||(o[1]=t("span",null,"相关图片视频",-1)),t("div",{class:M(["w-8 h-8",{"i-si:expand-less-fill":e.isMore,"i-si:expand-more-fill text-orange-500":!e.isMore}])},null,2)]),e.mediaIsLoading?(i(),c("div",I,o[2]||(o[2]=[t("p",{class:"text-orange-500"},"加载中...",-1)]))):e.isMore?(i(),c("div",S,[e.isNoMediaData?(i(),c("div",A,[t("p",L,P(e.noDataTip),1)])):e.videoUrl?(i(),c("div",V,[o[3]||(o[3]=t("p",null,"视频讲解：",-1)),t("video",{class:"max-w-95% w-420px",src:e.videoUrl,controls:""},null,8,W)])):y("",!0),e.picDict?(i(),c("div",F,[o[4]||(o[4]=t("p",null,"图片讲解：",-1)),t("img",{class:"max-w-200px",src:e.picDict,alt:"图片讲解"},null,8,N)])):y("",!0)])):y("",!0)],64)}const z=U(j,[["render",Y],["__file","VocabularyAudio.vue"]]);export{z as default};
