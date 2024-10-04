// ==UserScript==
// @name         Munpia 선호작 페이지 상시 표시 및 페이지 요소 이동
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Munpia에서 선호작 목록 페이지를 브라우저 좌측에 상시 표시하고, 페이지 요소들은 30px 이동. Iframe은 고정되어 움직이지 않음. 링크는 새탭에서 열림.
// @match        https://*.munpia.com/*
// @exclude      https://novel.munpia.com/page/novelous/group/subscribe
// @exclude      https://novel.munpia.com/*/page/*  // 여기에서 작동하지 않도록 추가
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 현재 URL을 확인하여 특정 주소에서는 동작하지 않도록
    const currentUrl = window.location.href;
    if (/https:\/\/novel\.munpia\.com\/\d+\/page\//.test(currentUrl)) {
        return; // 이 주소 패턴에서는 스크립트를 실행하지 않음
    }

    // 첫 번째 기능: 페이지의 모든 요소를 30px 오른쪽으로 이동
    const adjustPageRight = () => {
        const bodyElement = document.body;
        const htmlElement = document.documentElement;

        // body 및 html 요소에 margin-left 적용
        bodyElement.style.marginLeft = '30px';
        htmlElement.style.marginLeft = '30px';
    };

    // 페이지 로드 시 30px 이동 적용
    window.addEventListener('load', adjustPageRight);

    // 창 크기 조정 시에도 30px 유지
    window.addEventListener('resize', adjustPageRight);

    // 두 번째 기능: Iframe 생성 및 고정된 위치에 배치 (영향 받지 않음)
    const iframe = document.createElement('iframe');
    iframe.src = 'https://novel.munpia.com/page/novelous/group/subscribe'; // 선호작 페이지 URL
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';  // 브라우저 좌측에 고정
    iframe.style.width = '300px';  // 너비 조정
    iframe.style.height = '100%';  // 전체 높이
    iframe.style.border = 'none';
    iframe.style.zIndex = '9999'; // 다른 요소 위에 뜨도록 설정
    iframe.style.backgroundColor = '#fff';  // 배경색 설정 (필요에 따라 제거 가능)

    // Iframe 내에서 모든 링크를 새 탭에서 열리도록 설정
    iframe.onload = function() {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const links = iframeDocument.querySelectorAll('a');
        links.forEach(link => {
            link.setAttribute('target', '_blank'); // 모든 링크를 새탭에서 열리도록 설정
        });
    };

    // 페이지 로드 시 iframe을 추가
    document.body.appendChild(iframe);

    // Iframe은 페이지 이동 영향을 받지 않고 고정된 위치에 남음
})();
