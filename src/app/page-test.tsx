//this is the second written by Bryan to experiment
import Image from 'next/image'
import React from 'react';
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      
      <div className={styles.description}>
        <p>
          By Conlangers & Pentalingo (UW Seattle '23)
        </p>
        <div>
          <Image
            src="/img/iSchoolPrimary_RGB_Purple.jpeg"
            alt="UW iSchool Logo"
            className={styles.vercelLogo}
            width={200}
            height={37.525}
            priority
          />          
        </div>
      </div>

      {/* <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/img/langtime_studio_logo-transformed.png"
          alt="LangTime Logo"
          width={400}
          height={239.38}
          priority
        />
      </div> */}
      {/* <div id="word">
        <div className={styles.textbox}>
          <span className={styles.letter}>L</span>
          <span className={styles.letter}>A</span>
          <span className={styles.letter}>N</span>
          <span className={styles.letter}>G</span>
          <span className={styles.letter}>T</span>
          <span className={styles.letter}>I</span>
          <span className={styles.letter}>M</span>
          <span className={styles.letter}>E</span>
        </div>
      </div> */}
      <div className={styles.container}>
        <div className={styles.icon}>
          <div className={classNames(styles.imgBx, styles.active)} style={{['--i' as any]:1}}
          data-id="content1">
            <img className={styles.img} src="/img/log-in.png" alt="Log in"/>
          </div>
          <div className={styles.imgBx} style={{['--i' as any]:2}}
          data-id="content2">
            <img className={styles.img} src="/img/team.png" alt="About uS"/>
          </div>
          <div className={styles.imgBx} style={{['--i' as any]:3}}
          data-id="content3">
            <img className={styles.img} src="/img/iSchoolLogoPack/LogoPack_2018/SymbolOnly/Web/SVG/iSchoolSymbolOnly_RGB_Purple.svg" alt="Information School"/>
          </div>
          <div className={styles.imgBx} style={{['--i' as any]:4}}
          data-id="content4">
            <img className={styles.img} src="/img/create-account.png" alt="Log in"/>
          </div>
        </div>
        <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" language-tag="en" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500">
          <title>Circular Text Path</title>
          <defs>
            <path id="textcircle" d="M250,400
                        a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z" transform="rotate(12,250,250)" />
          </defs>
          <g className={styles.textcircle}>
            <text className={styles.text} textLength="940">
              <textPath 
                href="#textcircle" 
                aria-label="LangTime Studio" 
                textLength="940">
                LangTime Studio | LangTime Studio | LangTime Studio |&#160;
              </textPath>
            </text>
          </g>
        </svg>
      </div>
      <div className={styles.content}>
        <div className={classNames(styles.contentBx, styles.active)} id="content1">
          <div className={styles.card}>
            <div className={styles.imgBx}>
              <Image src= "/img/log-in.png" width={32} height={32} alt='login' />
            </div>
          </div>
          <div className={styles.textBxW}>
            <h2>Someone Famous</h2>
          </div>
        </div>
        <div className={styles.contentBx} id="content2">
          <div className={styles.card}>
            <div className={styles.imgBx}>
              <img src= "/img/team.png"/>
            </div>
          </div>
          <div className={styles.textBx}>
            <h2>Someone Famous</h2>
          </div>
        </div>
        <div className={styles.contentBx} id="content3">
          <div className={styles.card}>
            <div className={styles.imgBx}>
              <img src= "/img/iSchoolLogoPack/LogoPack_2018/SymbolOnly/Web/SVG/iSchoolSymbolOnly_RGB_Purple.svg"/>
            </div>
          </div>
          <div className={styles.textBx}>
            <h2>Someone Famous</h2>
          </div>
        </div>
        <div className={styles.contentBx} id="content4">
          <div className={styles.card}>
            <div className={styles.imgBx}>
              <img src= "/img/create-account.png"/>
            </div>
          </div>
          <div className={styles.textBx}>
            <h2>Someone Famous</h2>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <a href="/login" className={styles.card} target="_blank" rel="noopener noreferrer">
          <h2 className={inter.className}>
            Log In <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Create and manage the dictionary for your own Conlanguages.
          </p>
        </a>        
      </div>
    </main>
  )
}


// const cheerio = require('cheerio');
// const html = Home;
// const $ = cheerio.load(html);
// const paragraphs = $('p');
// console.log(paragraphs.length); // Output: 2

// function MyServerComponent() {
//   const client = useClient();
  
//   // render content as a server component
//   return client.renderToStaticMarkup(Home);
// }
// console.log(MyServerComponent);

// const http = require('http');
// const { JSDOM } = require('jsdom');
// let html;
// let selectedElements;
// const options = {
//   hostname: 'localhost',
//   port: 3000,
//   path: '/',
//   method: 'GET'
// };
// const req = http.request(options, res => {
//   res.on('data', chunk => {
//     if (!html) {
//       html = chunk.toString();
//       // Use the HTML content here
//       const dom = new JSDOM(html);
//       selectedElements = dom.window.document.querySelectorAll(`[class*=${"imgBx"}]`);
//       //console.log(selectedElements);
//     }
//   });
// });
// req.on('error', error => {
//   console.error(error);
// });
// req.on('close', () => {
//   console.log(`Number of imgBx elements: ${selectedElements.length}`);
// });
// req.end();

// const http = require('http');

// const options = {
//   hostname: 'localhost',
//   port: 3000,
//   path: '/',
//   method: 'GET'
// };

// let html = '';
// let requestSent = false; // flag variable to keep track of whether request has already been sent

// function sendRequest() {
//   if (!requestSent) {
//     requestSent = true;
//     const req = http.request(options, res => {
//       res.on('data', chunk => {
//         html += chunk;
//       });
//       res.on('end', () => {
//         //console.log(html);
//       });
//     });

//     req.on('error', error => {
//       console.error(error);
//     });

//     req.end();
//   }
// }

// sendRequest(); // call sendRequest function to send the request

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`
<!DOCTYPE html><html lang="en"><head><meta charSet="utf-8"/><link rel="stylesheet" href="/_next/static/css/app/layout.css?v=1682213704302" data-precedence="next.js"/><link rel="stylesheet" href="/_next/static/css/app/page.css?v=1682213704303" data-precedence="next.js"/><meta name="viewport" content="width=device-width, initial-scale=1"/><script src="/_next/static/chunks/polyfills.js" noModule=""></script></head><body><main class="page_main__ibFHK"><div class="page_description__s_Lqk"><p>By Conlangers &amp; Pentalingo (UW Seattle &#x27;23)</p><div><img alt="UW iSchool Logo" fetchPriority="high" width="200" height="37.525" decoding="async" data-nimg="1" class="page_vercelLogo__1QD2W" style="color:transparent" srcSet="/_next/image?url=%2Fimg%2FiSchoolPrimary_RGB_Purple.jpeg&amp;w=256&amp;q=75 1x, /_next/image?url=%2Fimg%2FiSchoolPrimary_RGB_Purple.jpeg&amp;w=640&amp;q=75 2x" src="/_next/image?url=%2Fimg%2FiSchoolPrimary_RGB_Purple.jpeg&amp;w=640&amp;q=75"/></div></div><div class="page_container__HHToX"><div class="page_icon__NhlQl"><div class="page_imgBx__h9LiN page_active__2HhZy" style="--i:1" data-id="content1"><img class="page_img__p8RFt" src="/img/log-in.png" alt="Log in"/></div><div class="page_imgBx__h9LiN" style="--i:2" data-id="content2"><img class="page_img__p8RFt" src="/img/team.png" alt="About uS"/></div><div class="page_imgBx__h9LiN" style="--i:3" data-id="content3"><img class="page_img__p8RFt" src="/img/iSchoolLogoPack/LogoPack_2018/SymbolOnly/Web/SVG/iSchoolSymbolOnly_RGB_Purple.svg" alt="Information School"/></div><div class="page_imgBx__h9LiN" style="--i:4" data-id="content4"><img class="page_img__p8RFt" src="/img/create-account.png" alt="Log in"/></div></div><svg class="page_svg__hWgSN" xmlns="http://www.w3.org/2000/svg" language-tag="en" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500"><title>Circular Text Path</title><defs><path id="textcircle" d="M250,400   a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z" transform="rotate(12,250,250)"></path></defs><g class="page_textcircle__BFEji"><text class="page_text__sneHE" textLength="940"><textPath href="#textcircle" aria-label="LangTime Studio" textLength="940">LangTime Studio | LangTime Studio | LangTime Studio | </textPath></text></g></svg></div><div class="page_content__rFejU"><div class="page_contentBx__e3ZBF page_active__2HhZy" id="content1"><div class="page_card__ftWzl"><div class="page_imgBx__h9LiN"><img src="/img/log-in.png"/></div></div><div><h2>Someone Famous</h2></div></div><div class="page_contentBx__e3ZBF" id="content2"><div class="page_card__ftWzl"><div class="page_imgBx__h9LiN"><img src="/img/team.png"/></div></div><div><h2>Someone Famous</h2></div></div><div class="page_contentBx__e3ZBF" id="content3"><div class="page_card__ftWzl"><div class="page_imgBx__h9LiN"><img src="/img/iSchoolLogoPack/LogoPack_2018/SymbolOnly/Web/SVG/iSchoolSymbolOnly_RGB_Purple.svg"/></div></div><div><h2>Someone Famous</h2></div></div><div class="page_contentBx__e3ZBF" id="content4"><div class="page_card__ftWzl"><div class="page_imgBx__h9LiN"><img src="/img/create-account.png"/></div></div><div><h2>Someone Famous</h2></div></div></div><div class="page_grid__2WZXq"><a href="/login" class="page_card__ftWzl" target="_blank" rel="noopener noreferrer"><h2 class="__className_ccafe3">Log In <span>-&gt;</span></h2><p class="__className_ccafe3">Create and manage the dictionary for your own Conlanguages.</p></a></div></main><script src="/_next/static/chunks/webpack.js" async=""></script><script src="/_next/static/chunks/main-app.js" async=""></script></body></html><script>(self.__next_f=self.__next_f||[]).push([0])</script><script>self.__next_f.push([1,"0:\"$L1\"\n"])</script><script>self.__next_f.push([1,"2:I{\"id\":\"(app-client)/./node_modules/next/dist/client/components/app-router.js\",\"chunks\":[\"app-client-internals:static/chunks/app-client-internals.js\"],\"name\":\"\",\"async\":false}\n4:I{\"id\":\"(app-client)/./node_modules/next/dist/client/components/error-boundary.js\",\"chunks\":[\"app-client-internals:static/chunks/app-client-internals.js\"],\"name\":\"\",\"async\":false}\n5:I{\"id\":\"(app-client)/./node_modules/next/dist/client/components/layout-router.js\",\"chunks\":[\"app-client-internals:static/chunks/app-client-internals.j"])</script><script>self.__next_f.push([1,"s\"],\"name\":\"\",\"async\":false}\n6:I{\"id\":\"(app-client)/./node_modules/next/dist/client/components/render-from-template-context.js\",\"chunks\":[\"app-client-internals:static/chunks/app-client-internals.js\"],\"name\":\"\",\"async\":false}\n7:I{\"id\":\"(app-client)/./node_modules/next/dist/client/image.js\",\"chunks\":[\"app/page:static/chunks/app/page.js\"],\"name\":\"\",\"async\":false}\n"])</script><script>self.__next_f.push([1,"1:[[[\"$\",\"link\",\"0\",{\"rel\":\"stylesheet\",\"href\":\"/_next/static/css/app/layout.css?v=1682213704302\",\"precedence\":\"next.js\"}]],[\"$\",\"$L2\",null,{\"assetPrefix\":\"\",\"initialCanonicalUrl\":\"/\",\"initialTree\":[\"\",{\"children\":[\"__PAGE__\",{}]},\"$undefined\",\"$undefined\",true],\"initialHead\":\"$L3\",\"globalErrorComponent\":\"$4\",\"notFound\":[\"$\",\"html\",null,{\"lang\":\"en\",\"children\":[[\"$\",\"head\",null,{}],[\"$\",\"body\",null,{\"children\":[\"$undefined\",[[\"$\",\"title\",null,{\"children\":\"404: This page could not be found.\"}],[\"$\",\"div\",null,{\"style\":{\"fontFamily\":\"system-ui,\\\"Segoe UI\\\",Roboto,Helvetica,Arial,sans-serif,\\\"Apple Color Emoji\\\",\\\"Segoe UI Emoji\\\"\",\"height\":\"100vh\",\"textAlign\":\"center\",\"display\":\"flex\",\"flexDirection\":\"column\",\"alignItems\":\"center\",\"justifyContent\":\"center\"},\"children\":[\"$\",\"div\",null,{\"children\":[[\"$\",\"style\",null,{\"dangerouslySetInnerHTML\":{\"__html\":\"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}\"}}],[\"$\",\"h1\",null,{\"className\":\"next-error-h1\",\"style\":{\"display\":\"inline-block\",\"margin\":\"0 20px 0 0\",\"padding\":\"0 23px 0 0\",\"fontSize\":24,\"fontWeight\":500,\"verticalAlign\":\"top\",\"lineHeight\":\"49px\"},\"children\":\"404\"}],[\"$\",\"div\",null,{\"style\":{\"display\":\"inline-block\"},\"children\":[\"$\",\"h2\",null,{\"style\":{\"fontSize\":14,\"fontWeight\":400,\"lineHeight\":\"49px\",\"margin\":0},\"children\":\"This page could not be found.\"}]}]]}]}]]]}]]}],\"asNotFound\":false,\"children\":[[\"$\",\"html\",null,{\"lang\":\"en\",\"children\":[[\"$\",\"head\",null,{}],[\"$\",\"body\",null,{\"children\":[\"$\",\"$L5\",null,{\"parallelRouterKey\":\"children\",\"segmentPath\":[\"children\"],\"error\":\"$undefined\",\"errorStyles\":\"$undefined\",\"loading\":\"$undefined\",\"loadingStyles\":\"$undefined\",\"hasLoading\":false,\"template\":[\"$\",\"$L6\",null,{}],\"templateStyles\":\"$undefined\",\"notFound\":\"$undefined\",\"notFoundStyles\":\"$undefined\",\"asNotFound\":false,\"childProp\":{\"current\":[[\"$\",\"main\",null,{\"className\":\"page_main__ibFHK\",\"children\":[[\"$\",\"div\",null,{\"className\":\"page_description__s_Lqk\",\"children\":[[\"$\",\"p\",null,{\"children\":\"By Conlangers \u0026 Pentalingo (UW Seattle '23)\"}],[\"$\",\"div\",null,{\"children\":[\"$\",\"$L7\",null,{\"src\":\"/img/iSchoolPrimary_RGB_Purple.jpeg\",\"alt\":\"UW iSchool Logo\",\"className\":\"page_vercelLogo__1QD2W\",\"width\":200,\"height\":37.525,\"priority\":true}]}]]}],[\"$\",\"div\",null,{\"className\":\"page_container__HHToX\",\"children\":[[\"$\",\"div\",null,{\"className\":\"page_icon__NhlQl\",\"children\":[[\"$\",\"div\",null,{\"className\":\"page_imgBx__h9LiN page_active__2HhZy\",\"style\":{\"--i\":1},\"data-id\":\"content1\",\"children\":[\"$\",\"img\",null,{\"className\":\"page_img__p8RFt\",\"src\":\"/img/log-in.png\",\"alt\":\"Log in\"}]}],[\"$\",\"div\",null,{\"className\":\"page_imgBx__h9LiN\",\"style\":{\"--i\":2},\"data-id\":\"content2\",\"children\":[\"$\",\"img\",null,{\"className\":\"page_img__p8RFt\",\"src\":\"/img/team.png\",\"alt\":\"About uS\"}]}],[\"$\",\"div\",null,{\"className\":\"page_imgBx__h9LiN\",\"style\":{\"--i\":3},\"data-id\":\"content3\",\"children\":[\"$\",\"img\",null,{\"className\":\"page_img__p8RFt\",\"src\":\"/img/iSchoolLogoPack/LogoPack_2018/SymbolOnly/Web/SVG/iSchoolSymbolOnly_RGB_Purple.svg\",\"alt\":\"Information School\"}]}],[\"$\",\"div\",null,{\"className\":\"page_imgBx__h9LiN\",\"style\":{\"--i\":4},\"data-id\":\"content4\",\"children\":[\"$\",\"img\",null,{\"className\":\"page_img__p8RFt\",\"src\":\"/img/create-account.png\",\"alt\":\"Log in\"}]}]]}],[\"$\",\"svg\",null,{\"className\":\"page_svg__hWgSN\",\"xmlns\":\"http://www.w3.org/2000/svg\",\"language-tag\":\"en\",\"xmlnsXlink\":\"http://www.w3.org/1999/xlink\",\"viewBox\":\"0 0 500 500\",\"children\":[[\"$\",\"title\",null,{\"children\":\"Circular Text Path\"}],[\"$\",\"defs\",null,{\"children\":[\"$\",\"path\",null,{\"id\":\"textcircle\",\"d\":\"M250,400   a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z\",\"transform\":\"rotate(12,250,250)\"}]}],[\"$\",\"g\",null,{\"className\":\"page_textcircle__BFEji\",\"children\":[\"$\",\"text\",null,{\"className\":\"page_text__sneHE\",\"textLength\":\"940\",\"children\":[\"$\",\"textPath\",null,{\"href\":\"#textcircle\",\"aria-label\":\"LangTime Studio\",\"textLength\":\"940\",\"children\":\"LangTime Studio | LangTime Studio | LangTime Studio | \"}]}]}]]}]]}],[\"$\",\"div\",null,{\"className\":\"page_content__rFejU\",\"children\":[[\"$\",\"div\",null,{\"className\":\"page_contentBx__e3ZBF page_active__2HhZy\",\"id\":\"content1\",\"children\":[[\"$\",\"div\",null,{\"className\":\"page_card__ftWzl\",\"children\":[\"$\",\"div\",null,{\"className\":\"page_imgBx__h9LiN\",\"children\":[\"$\",\"img\",null,{\"src\":\"/img/log-in.png\"}]}]}],[\"$\",\"div\",null,{\"className\":\"$undefined\",\"children\":[\"$\",\"h2\",null,{\"children\":\"Someone Famous\"}]}]]}],[\"$\",\"div\",null,{\"className\":\"page_contentBx__e3ZBF\",\"id\":\"content2\",\"children\":[[\"$\",\"div\",null,{\"className\":\"page_card__ftWzl\",\"children\":[\"$\",\"div\",null,{\"className\":\"page_imgBx__h9LiN\",\"children\":[\"$\",\"img\",null,{\"src\":\"/img/team.png\"}]}]}],[\"$\",\"div\",null,{\"className\":\"$undefined\",\"children\":[\"$\",\"h2\",null,{\"children\":\"Someone Famous\"}]}]]}],[\"$\",\"div\",null,{\"className\":\"page_contentBx__e3ZBF\",\"id\":\"content3\",\"children\":[[\"$\",\"div\",null,{\"className\":\"page_card__ftWzl\",\"children\":[\"$\",\"div\",null,{\"className\":\"page_imgBx__h9LiN\",\"children\":[\"$\",\"img\",null,{\"src\":\"/img/iSchoolLogoPack/LogoPack_2018/SymbolOnly/Web/SVG/iSchoolSymbolOnly_RGB_Purple.svg\"}]}]}],[\"$\",\"div\",null,{\"className\":\"$undefined\",\"children\":[\"$\",\"h2\",null,{\"children\":\"Someone Famous\"}]}]]}],[\"$\",\"div\",null,{\"className\":\"page_contentBx__e3ZBF\",\"id\":\"content4\",\"children\":[[\"$\",\"div\",null,{\"className\":\"page_card__ftWzl\",\"children\":[\"$\",\"div\",null,{\"className\":\"page_imgBx__h9LiN\",\"children\":[\"$\",\"img\",null,{\"src\":\"/img/create-account.png\"}]}]}],[\"$\",\"div\",null,{\"className\":\"$undefined\",\"children\":[\"$\",\"h2\",null,{\"children\":\"Someone Famous\"}]}]]}]]}],[\"$\",\"div\",null,{\"className\":\"page_grid__2WZXq\",\"children\":[\"$\",\"a\",null,{\"href\":\"/login\",\"className\":\"page_card__ftWzl\",\"target\":\"_blank\",\"rel\":\"noopener noreferrer\",\"children\":[[\"$\",\"h2\",null,{\"className\":\"__className_ccafe3\",\"children\":[\"Log In \",[\"$\",\"span\",null,{\"children\":\"-\u003e\"}]]}],[\"$\",\"p\",null,{\"className\":\"__className_ccafe3\",\"children\":\"Create and manage the dictionary for your own Conlanguages.\"}]]}]}]]}],[null,null]],\"segment\":\"__PAGE__\"},\"styles\":[[\"$\",\"link\",\"0\",{\"rel\":\"stylesheet\",\"href\":\"/_next/static/css/app/page.css?v=1682213704303\",\"precedence\":\"next.js\"}]]}]}]]}],[null,null]]}]]\n"])</script><script>self.__next_f.push([1,"3:[[[\"$\",\"meta\",null,{\"charSet\":\"utf-8\"}],null,null,null,null,null,null,null,null,null,null,[\"$\",\"meta\",null,{\"name\":\"viewport\",\"content\":\"width=device-width, initial-scale=1\"}],null,null,null,null,null,null,null,null,null,null,[]],[null,null,null,null],null,null,[null,null,null,null,null],null,null,null,null,null]\n"])</script>`);
const document = dom.window.document;

let imgBx = document.querySelectorAll(`[class*=${"imgBx"}]`);
let contentBx = document.querySelectorAll(`[class*=${"contentBx"}]`);

//console.log(imgBx); // logs NodeList of elements with class "imgBx"


// let imgBx = document.querySelectorAll(".imgBx");
// let contentBx = document.querySelectorAll('.contentBx');

for (let i=0; i<imgBx.length; i++){
  imgBx[i].addEventListener('mouseover', function(){
    for(let i=0; i<contentBx.length; i++){
      contentBx[i].className = "contentBx";
    }
    document.getElementById(this.dataset.id).
    className = 'contentBx active';

    for (let i=0; i<imgBx.length; i++){
      imgBx[i].className = 'imgBx'; 
    }
    this.className = "imgBx active";
  })
}

imgBx.forEach((img, index) => {
  img.addEventListener('mouseover', function(){
    contentBx.forEach((content, index) => {
      content.className = "contentBx";
    });
    document.getElementById(this.dataset.id).className = 'contentBx active';
    imgBx.forEach((img, index) => {
      img.className = 'imgBx';
    });
    this.className = "imgBx active";
  });
});
