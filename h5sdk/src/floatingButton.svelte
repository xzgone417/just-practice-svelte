<svelte:options customElement="sf-button" />

<script lang="ts">
  import { fade } from "svelte/transition";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { tick, onMount } from "svelte";
  import md5 from "blueimp-md5";
  import { pngList64, historyImg64 } from "./lib/letter";
  import { sdkRequest } from "./lib/request";
  import CustomerPart from "./components/CustomerPart.svelte";
  import AgreementPart from "./components/AgreementPart.svelte";
  import BindPart from "./components/BindPart.svelte";
  import PasswordPart from "./components/PasswordPart.svelte";
  import AccountPart from "./components/AccountPart.svelte";
  import MainPart from "./components/MainPart.svelte";
  import RegisterPart from "./components/RegisterPart.svelte";
  import CryptoJS from "crypto-js";
  import { Base64 } from "js-base64";
  import { t, locale } from "./lib/i18n";
  import type {
    ResponseHandlerType,
    RequestConfigType,
    RequestQueryType,
  } from "./lib/request";

  import DialogPart from "./components/DialogPart.svelte";
  import { initializeApp } from "firebase/app";
  import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithRedirect,
  } from "firebase/auth";
  import {
    gtag_report,
    af_report,
    ta_report,
    ta_login,
    af_login,
    ta_init,
    gtag_report_conversion,
    fb_report_payment,
    ta_userSet,
  } from "./lib/report";
  import thinkingdata from "thinkingdata-browser";

  export let Sdk: any;
  export let havingShortcut = null as any;

  let sdkInitConfig: any = {};
  let sdkRoleConfig: any = {};
  let secretKey: string;
  let appID: string = "";
  let apiUrl = "https://api-server.sogamecdn.com";
  let h5sdkimei = "h5sdkimei";
  let initDataKey = "initDataKey";
  let initData: any = {};
  let payDataKey: any = {};
  let isShowLogin: boolean = false;
  let isShowLoginOther = false;
  let isShowLoginRegister = false;
  let isShowRegister = false;
  let isShowTips = false;
  let isShowConfirm = false;
  let isSwitchAccount = false;
  let isVisitorLoginAccount = false;
  let isShowSwitchAccount = false;
  let isShowUserCenter = false;
  let isShowOverlay = false;
  let showLoader = false;
  let showBack = false;
  let eyeShow = true;
  let theText = "";
  let switchText = "";
  let fingerprintString = "";
  let uniqueString = "";
  let isLogin = false;
  let isShowEmail = false;
  let isShowEmailTips = false;
  let isShowGetPassWord = false;
  let isShowResetPassWord = false;
  let isShowGetUserName = false;
  let isShowUserName = false;
  let theUserNameData: any = {};
  let emailTips: any = "";
  let isEmailBind = false;
  let isLogOff = false;
  let isShowUpdateAccounted = false;
  let isShowUpdateAccount = false;
  let accountTitle = "";
  let accountLoginName = "";
  let accountName = "";
  let deleteEmail = false;
  let isBindAccount = false;
  let isPrivacyPolicy = false;
  let isCustomerService = false;
  let isShowBindAccounted = false;
  let typeName = "";
  // let accountType: any;
  let inputType = "password";
  let theUsername = "";
  let thePassword = "";
  let theEmail = "";
  let emailOtp = "";
  let passUserName = "";
  let passEmail = "";
  let passEmailOtp = "";
  let passwordReset = "";
  let userNameEmail = "";
  let isUserChecked = false; // 初始状态为未选中
  let isLogOffChecked = true;
  let userLoginInfoKey = "userLoginInfokey";
  let userLoginInfoListKey = "userLoginInfoListkey";
  let userDetailKey = "userDetailKey";
  let userDetail: any;
  let userLoginInfo: any;
  let userLoginInfoList: any;
  let loginTypes: any;
  let title: any;
  let content: any;
  let confirmText = $t("sf_action_confirm");
  let cancelText = $t("sf_action_cancel");
  let confirm: any;
  let onLoginSuccess: any;
  let onClickFloatingButton: any;
  let onLogOffSuccess: any;
  let emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let regex = /^[a-zA-Z0-9]{6,20}$/;
  // XZG0从这开始定义变量
  let showTabBar = true;
  let showUserAccount = false;
  let showUserNews = false;
  let showUserGift = false;
  let showUserSupport = false;
  $: topContext = $t("sf_user_center");
  let showStoredValueOrder = false;
  let storedValueOrderList: any[] = [];
  let orderLoading = false;
  let orderRefresh = false;
  let orderCurrentPage = 1;
  let orderPageSize = 15;
  let orderTotal = 0;
  let ourOrderList = true;
  let theOrderScroll: any = null;
  let showQuestionnaireDoor = false;
  let showQuestionnaire = false;
  let questionnaireInfo: any = {};
  let questionnaireInfoList: any[] = [];
  let showInformation = false;
  let informationList: any[] = [];
  let showInformationDetail = false;
  let informationDetail = "";
  let showGiftBag = false;
  let showGiftBagInfo = false;
  let giftBagList: any[] = [];
  let giftBagInfo: any = {};
  let facebookInfo: any = {};
  let facebookUserInfo: any = {};
  let facebookLoginInfo: any = {};
  let iosLoginInfo: any = {};
  let iosUserInfo: any = {};
  let showUnbindFacebook = false;
  let showUnbindGoogle = false;
  let googleButton: any = null;
  let googleInfo: any = {};
  let googleUserInfo: any = {};
  let showGoogleBind = false;
  let theGoogleBind: any = null;
  let theGoogleUnbind: any = null;
  let googleStatus = 0;
  let tabActive = 1;
  let tipTimeCount = 3;
  let emailTimeCount = 60;
  let emailTimeShow = false;
  let emailText = $t("sf_action_send");
  let sendTrue = false;
  let platformTypeId = "11";
  let showHistoryAccountList = false;
  let showCustomerServiceFAQ = false;
  let customerServiceFaqList: any[] = [];
  let customerServiceFaqDesc: any[] = [];
  let customerServiceFaqReply: any[] = [];
  let theHistoryUserInfo: any = {};
  let showLogoutAgreement = false;
  let logoutAgreementStatus = 0;
  let logoutAgreementTitle = $t("sf_cancel_account_conditions_title");
  let isLogoutAgreementCondition = false;
  let isLogoutAgreementRead = false;
  let historyImgs = historyImg64;
  let png64 = pngList64;
  let now = new Date();
  let timestamp = now.valueOf();
  function nowTimeStamp() {
    now = new Date();
    return (timestamp = now.valueOf());
  }
  let isDragging = false;
  let dargOrClick = false;
  let startX: number;
  let startY: number;
  let floatingButton: HTMLDivElement;
  let isMouseMove = false;
  let floatOffsetX = 0;
  let floatOffsetY = 0;
  let questionFlag = false;
  let thirdPayInfo = {} as any;
  let isPayPopup = false;
  let selectCountry = {} as any;
  let countryOptions = [] as any[];
  let payRedirectUrlUrl = "";
  let isFunnyDialog = false;
  let isOrderCheckDialog = false;
  let thirdRedirectUrl = "";
  let deferredPrompt = null as any;
  let selectCountryThirdCountry = "";
  $: reportInfoValue = {
    success: true,
    account_type: userLoginInfo?.accountType,
    user_id: userLoginInfo?.uid,
    user_name: userLoginInfo?.loginName,
    token_suffix: userLoginInfo?.token.slice(-4),
  };
  $: appLang = "zh-TW";
  $: firebaseConfig = {} as any;
  $: fireProvider = {} as any;
  $: fireAuth = {} as any;
  $: often_config = {
    appID: appID,
    uid: userLoginInfo?.uid,
    timestamp: nowTimeStamp(),
    secretKey: secretKey,
    apiUrl: apiUrl,
    appVersion: sdkInitConfig.appVersion,
    sdkVersion: sdkInitConfig.sdkVersion,
    platformId: platformTypeId,
    uniqueString: uniqueString,
    method: "POST",
    acceptLanguage: appLang || "en",
  } as Omit<RequestConfigType, "truthUrl">;
  $: often_resHandler = {
    onReadyStatus: () => {},
    onStatusFail: (Xhr: any) => {
      showLoader = false;
      showTooltip(Xhr.status);
    },
    onCodeFail: (responseData: any) => {
      showLoader = false;
      loserReason(responseData);
    },
  } as Omit<ResponseHandlerType, "onSuccess">;
  $: {
    if (countryOptions?.length > 0) {
      countryOptions.forEach((item) => {
        item.label = $t(`other.${item.thirdCountry}`);
      });
      countryOptions = countryOptions;
    }
    whetherDevice();
  }
  // AES 解密函数
  async function decryptAES(ciphertext: any, key: any, iv: any) {
    const decrypted = await CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(ciphertext) },
      CryptoJS.enc.Utf8.parse(key),
      { iv: CryptoJS.enc.Utf8.parse(iv) }
    );
    const decryptedStr = decrypted
      .toString(CryptoJS.enc.Utf8)
      .replace(/[\u0000-\u001F\u007F-\u009F]+/g, "")
      .trim();

    return decryptedStr;
  }
  const whetherDevice = () => {
    if (/(iPhone|iPad|iPod|ios)/i.test(navigator.userAgent)) {
      platformTypeId = "13";
    } else if (/(Android)/i.test(navigator.userAgent)) {
      platformTypeId = "12";
    } else {
      platformTypeId = "11";
    }
  };
  //
  function sdkAPIDataReporting(
    key: string,
    _sdkRoleConfig: any,
    _type: number
  ) {
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/user/role/upload",
    };
    const once_query: any = {
      appID: appID,
      timestamp: nowTimeStamp(),
      uid: userLoginInfo.uid,
      channelID: platformTypeId,
      type: _type,
      roleID: _sdkRoleConfig.roleID,
      roleLevel: _sdkRoleConfig.roleLevel,
      roleName: _sdkRoleConfig.roleName,
      serverID: _sdkRoleConfig.serverID,
      serverName: _sdkRoleConfig.serverName,
      vip: _sdkRoleConfig.vip,
      createTime: _sdkRoleConfig.createTime,
      lastLevelUpTime: nowTimeStamp(),
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {},
    };
    sdkRequest(once_config, once_query, once_resHandler);
  }
  function reporting(key: string, value: any) {
    try {
      gtag_report(key, value);
      af_report(key, value);
      ta_report(key, value);
    } catch (error) {
      console.error(error);
    }
  }
  function submitGameDataReporting(
    key: string,
    value: any,
    _type: number,
    _sdkRoleConfig: any = sdkRoleConfig
  ) {
    try {
      gtag_report(key, value);
      af_report(key, value);
      ta_report(key, value);
      sdkAPIDataReporting(key, _sdkRoleConfig, _type);
    } catch (error) {
      console.error(error);
    }
  }
  function floatingDragStart(e: any) {
    if (e.touches.length === 1) {
      isDragging = true;
    }
    dargOrClick = false;
    var touch = e.touches[0];
    startX = touch.pageX - floatingButton.offsetLeft;
    startY = touch.pageY - floatingButton.offsetTop;
  }

  function floatingDragMove(e: any) {
    if (!isDragging) return;
    let touch = e.touches[0];
    // 计算新的位置
    let newLeft = touch.pageX - startX;
    let newTop = touch.pageY - startY;
    // 限制按钮在视口内
    newLeft = Math.max(
      0,
      Math.min(newLeft, window.innerWidth - floatingButton.offsetWidth)
    );
    newTop = Math.max(
      0,
      Math.min(newTop, window.innerHeight - floatingButton.offsetHeight)
    );
    // 更新按钮的位置
    floatingButton.style.left = `${newLeft}px`;
    floatingButton.style.top = `${newTop}px`;
    dargOrClick = true;
  }

  function floatingDragEnd(event: any) {
    isDragging = false;
    if (dargOrClick) {
      dargOrClick = false;
      if (
        document.documentElement.clientWidth - floatingButton.offsetLeft < 51 &&
        document.documentElement.clientWidth - floatingButton.offsetLeft > 25
      ) {
        floatingButton.style.left = `${document.documentElement.clientWidth - 25}px`;
        floatingButton.style.opacity = "0.6";
      }
      if (floatingButton.offsetLeft < 6 && floatingButton.offsetLeft >= 0) {
        floatingButton.style.left = `${-25}px`;
        floatingButton.style.opacity = "0.6";
      }
      if (
        floatingButton.offsetLeft >= 25 &&
        document.documentElement.clientWidth - floatingButton.offsetLeft > 55
      ) {
        floatingButton.style.opacity = "1";
      }
    }
  }
  function handleMouseDown(event: any) {
    if (event.button === 0) {
      isMouseMove = true;
    }
    floatOffsetX = event.clientX - floatingButton.offsetLeft;
    floatOffsetY = event.clientY - floatingButton.offsetTop;
  }

  function handleMouseMove(event: any) {
    if (isMouseMove) {
      floatingButton.style.left =
        Math.min(
          window.innerWidth - 50,
          Math.max(0, event.clientX - floatOffsetX)
        ) + "px";
      floatingButton.style.top =
        Math.min(
          window.innerHeight - 50,
          Math.max(0, event.clientY - floatOffsetY)
        ) + "px";
    }
  }

  function handleMouseUp() {
    isMouseMove = false;
  }
  function toggleUserCenter() {
    if (!floatingButton.style.opacity || floatingButton.style.opacity === "0") {
      return;
    }

    if (floatingButton.style.opacity === "0.6") {
      floatingButton.style.opacity = "1";
      if (
        floatingButton.style.left ===
        `${document.documentElement.clientWidth - 25}px`
      ) {
        floatingButton.style.left = `${document.documentElement.clientWidth - 60}px`;
      } else if (floatingButton.style.left === `${-25}px`) {
        floatingButton.style.left = "10px";
      }
    } else {
      //取登陆信息
      if (typeof onClickFloatingButton === "function") {
        onClickFloatingButton();
      }
      if (whetherLogin()) {
        isLogin = true;
      } else {
        isLogin = false;
      }
      isShowUserCenter = true;
    }
  }

  function signParams(params: string, secretKey: string) {
    const paramStringSign = params + "&secretKey=" + secretKey;
    const signature = md5(paramStringSign).toUpperCase();
    return signature;
  }

  function paramsSting(params: {
    [x: string]: any;
    appID?: any;
    timestamp?: number;
    uid?: any;
    accountType?: any;
    roleID?: string;
    serverID?: string;
    username?: any;
    password?: string;
    code?: string;
    email?: any;
    deviceID?: string;
    token?: any;
    validType?: number;
    currentPage?: number;
    pageSize?: number;
    qid?: number;
  }) {
    // 假设params是一个对象，键是参数名，值是参数值
    // 首先，将参数按键名排序
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((result: any, key) => {
        result[key] = params[key];
        return result;
      }, {});
    // 然后，将排序后的参数拼接成一个字符串
    const paramString = Object.keys(sortedParams)
      .map((key) => `${key}=${sortedParams[key]}`)
      .join("&");

    return paramString;
  }

  function showTooltip(message: string) {
    theText = message;
    isShowTips = true;
    if (isShowTips) {
      let timer = setTimeout(() => {
        isShowTips = false;
        clearTimeout(timer);
      }, 2000);
    }
  }
  function hideTooltip() {
    isShowTips = false;
  }

  function showConfirm(
    tit: string,
    message: string,
    fun: { (): void; (): void }
  ) {
    title = tit;
    content = message;
    confirm = fun;
    isShowConfirm = true;
    isShowOverlay = true;
  }

  function handleConfirm() {
    isShowConfirm = false;
    if (typeof confirm === "function") {
      confirm();
    }
  }

  function handleCancel() {
    confirm = false;
    isShowConfirm = false;
    isShowOverlay = false;
  }
  function startCountdown(times: number, type?: number) {
    if (type === 1) {
      emailTimeCount = times;
      let codeTimer = setInterval(() => {
        if (emailTimeCount > 0 && emailTimeCount <= times) {
          emailTimeCount--;
        } else {
          emailTimeShow = false;
          emailText = $t("sf_action_send");
          clearInterval(codeTimer);
        }
      }, 1000);
    } else {
      tipTimeCount = times;
      let tipTimer = setInterval(() => {
        if (tipTimeCount > 0) {
          tipTimeCount--;
        } else {
          tipTimeCount = times;
          isSwitchAccount = false;
          clearInterval(tipTimer);
        }
      }, 1000);
    }
  }
  function toSwitchAccount(message: string, timing?: number) {
    whetherLogin();
    switchText = message;
    if (
      userLoginInfo.displayType === 1 &&
      userLoginInfo.accountType === 1 &&
      timing === 1
    ) {
      isVisitorLoginAccount = true;
    } else {
      isSwitchAccount = true;
      isVisitorLoginAccount = false;
    }

    reporting("sdk_login_success_notify", reportInfoValue);
    if (isSwitchAccount) {
      startCountdown(3);
    }
  }

  // 打开切换账号
  function showSwitchAccount() {
    isShowLoginRegister = false;
    userLoginInfo = getLocalStorage(userLoginInfoKey);
    if (userLoginInfo !== null) {
      userLoginInfo = JSON.parse(userLoginInfo);
      theHistoryUserInfo = userLoginInfo;
      isShowSwitchAccount = true;
      showHistoryAccountList = false;
      isSwitchAccount = false;
      isShowOverlay = true;
      tipTimeCount = 3;
      hideTooltip();
    }
  }
  // 显示历史登录记录
  function showSwitchAccountList() {
    userLoginInfoList = getLocalStorage(userLoginInfoListKey);
    if (userLoginInfoList !== null) {
      userLoginInfoList = JSON.parse(userLoginInfoList);
      if (userLoginInfoList.length > 1) {
        showHistoryAccountList = !showHistoryAccountList;
        isShowOverlay = true;
      } else {
        showTooltip($t("other.no_other_login_history_currently"));
      }
      userLoginInfoList = userLoginInfoList.map(JSON.parse);
    }
  }

  function selectHistoryUserInfo(event: CustomEvent) {
    const { item } = event.detail;
    showHistoryAccountList = false;
    theHistoryUserInfo = item;
  }
  function countValueTime(tm: number) {
    let timeValue = "";
    const tmp = nowTimeStamp() - tm;
    const seconds = Math.floor(tmp / 1000);
    if (seconds <= 60) {
      timeValue = seconds + $t("sf_verify_countdown");
    } else {
      const minutes = Math.floor(tmp / 1000 / 60);
      if (minutes <= 60) {
        timeValue = minutes + $t("sf_login_time_minutes");
      } else {
        const hours = Math.floor(tmp / 1000 / 60 / 60);
        if (hours <= 24) {
          timeValue = hours + $t("sf_login_time_hours");
        } else {
          const days = Math.floor(tmp / 1000 / 60 / 60 / 24);
          timeValue = days + $t("sf_login_time_hours");
        }
      }
    }
    return timeValue;
  }
  function handleEyeShow() {
    if (eyeShow) {
      eyeShow = false;
      inputType = "text";
    } else {
      eyeShow = true;
      inputType = "password";
    }
  }

  function handleCheckboxChange() {
    // 这里可以添加处理复选框状态改变时的逻辑
  }
  function generateBrowserFingerprint() {
    var fingerprint = {} as any;
    // 获取用户代理字符串
    fingerprint.userAgent = navigator.userAgent;
    // 获取屏幕宽度和高度
    // fingerprint.screen = {
    //   width: screen.width,
    //   height: screen.height,
    // };
    // // 获取窗口大小
    // fingerprint.window = {
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    // };
    // // 获取字体列表
    // fingerprint.fonts = getFonts();
    // 获取WebGL渲染器信息
    // fingerprint.webgl = getWebGLRenderer();
    // 获取Canvas指纹
    // fingerprint.canvas = getCanvasFingerprint();
    // fingerprint.timestamp = Date.now();
    // ... 可以继续添加其他指纹信息
    // 将指纹信息转化为字符串，便于存储和传输
    return JSON.stringify(fingerprint);
  }

  // 获取浏览器支持的字体列表
  function getFonts() {
    var body = document.body;
    var style = document.createElement("style");
    style.type = "text/css";
    style.id = "font-detect";
    // 定义检测字体列表
    var fontsToDetect = ["Arial", "FontAwesome", "Comic Sans MS"];
    var detectedFonts = [];
    // 创建用于检测字体的div
    var div = document.createElement("div");
    div.id = "fonts";
    div.style.position = "absolute";
    div.style.visibility = "hidden";
    div.style.width = "auto";
    div.style.height = "auto";
    div.style.whiteSpace = "nowrap";
    body.appendChild(div);

    for (var i = 0; i < fontsToDetect.length; i++) {
      var font = fontsToDetect[i];
      var s = document.createElement("s");
      s.innerHTML = "xxxx";
      s.style.fontFamily = font + ",sans-serif";
      div.appendChild(s);
    }

    body.appendChild(style);

    // 使用@font-face规则检测字体
    for (var j = 0; j < fontsToDetect.length; j++) {
      var font = fontsToDetect[j];
      style.innerHTML +=
        '@font-face { font-family: "' +
        font +
        '"; src: url(https://example.com/nonexistent.eot); }';
      style.innerHTML +=
        "#fonts > s:nth-child(" +
        (j + 1) +
        ') { font-family: "' +
        font +
        '",sans-serif; font-size: 16px; }';
    }

    window.getComputedStyle(div.firstChild as any).fontFamily;
    detectedFonts = [];
    for (var k = 0; k < fontsToDetect.length; k++) {
      var detectedFont = window.getComputedStyle(
        div.childNodes[k] as any
      ).fontFamily;
      if (detectedFont.indexOf(fontsToDetect[k]) > -1) {
        detectedFonts.push(fontsToDetect[k]);
      }
    }

    body.removeChild(style);
    body.removeChild(div);

    return detectedFonts;
  }

  // 获取WebGL渲染器信息
  function getWebGLRenderer() {
    var canvas = document.createElement("canvas");
    var gl: any =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    var renderer = gl ? gl.getParameter(gl.RENDERER) : null;
    return renderer ? renderer.toString() : null;
  }

  // 获取Canvas指纹
  function getCanvasFingerprint() {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context!.font = "18pt Arial";
    context!.fillText("Hello, world!", 2, 15);
    return canvas.toDataURL();
  }
  function generateUniqueStringWithTimestampAndUUID() {
    // 获取浏览器指纹信息
    const fingerprintString = generateBrowserFingerprint();
    // 获取当前时间戳
    // const timestamp = Date.now().toString();
    // 生成一个UUID
    const uuid = crypto.randomUUID();
    // 将指纹信息、时间戳和UUID组合
    const combinedString = fingerprintString + uuid;
    // 使用MD5或其他哈希算法生成uniqueString
    const uniqueString = md5(combinedString);

    return uniqueString;
  }
  function setCookie(name: string, value: string, daysToLive: number) {
    var expires = "";
    if (daysToLive) {
      var date = new Date();
      date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  function getCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }
  function requestSofishWindowConfig() {
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/usersf/sofishwindowconfig",
      platformId: platformTypeId,
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      uid: userLoginInfo.uid,
      accountType: userLoginInfo.accountType,
      roleID: sdkRoleConfig.roleID,
      serverID: sdkRoleConfig.serverID,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        if (responseData.data?.questionId) {
          questionFlag = true;
        }
        localStorage.setItem(
          "sofishWindowConfig",
          JSON.stringify(responseData.data)
        );
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
  }
  function requestCheckUserIp() {
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/thirdorder/checkUserIp",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      uid: userLoginInfo.uid,
      channelID: platformTypeId,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        payDataKey = JSON.stringify(responseData.data);
        localStorage.setItem("payDataKey", payDataKey);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
  }
  // 失败原因
  function loserReason(params: any, other: any = "") {
    const errCodes = [
      1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012,
      1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1023, 1028, 1029, 1030,
      1031, 1032, 2000, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
      2011, 2012, 2013,
    ];
    if (errCodes.includes(Number(params.code))) {
      if (
        params.code === 1029 ||
        params.code === 1011 ||
        params.code === 1008
      ) {
        return showTooltip(other + params.msg);
      }
      const errMsg = `sf_error_${params.code}`;
      showTooltip(other + $t(errMsg));
    } else {
      showTooltip(other + params.msg);
    }
  }

  //所有注册登陆之后存取用户登录信息
  function setUserLoginInfo(value: { timestamp: number; uid: any }) {
    value.timestamp = nowTimeStamp();
    //存当前登陆的
    userLoginInfo = value;
    setLocalStorage(userLoginInfoKey, JSON.stringify(value));
    //存历史 包括当前登录的
    let existingList = localStorage.getItem(userLoginInfoListKey);
    let myList = [];
    if (existingList !== null) {
      myList = removeElementByUid(JSON.parse(existingList), value.uid);
    } else {
      // 如果不存在，则创建一个新数组
      myList = [];
    }
    // 将新元素添加到数组的第一个位置
    myList.unshift(JSON.stringify(value));
    // 如果数组长度超过5，移除最后一个元素
    if (myList.length > 5) {
      myList.pop();
    }
    // 将更新后的数组存回localStorage
    localStorage.setItem(userLoginInfoListKey, JSON.stringify(myList));
    whetherLogin();
    getUserDetail(); //获取详情
  }

  function removeElementByUid(
    jsonArray: {
      map: (
        arg0: (
          text: string,
          reviver?: ((this: any, key: string, value: any) => any) | undefined
        ) => any
      ) => any;
    },
    uidToRemove: any
  ) {
    // 解析JSON字符串数组为对象数组
    const arrayOfObjects = jsonArray.map(JSON.parse);
    // 过滤掉具有指定uid的对象
    const filteredArray = arrayOfObjects.filter(
      (obj: { uid: any }) => obj.uid !== uidToRemove
    );
    // 如果需要，将对象数组转换回JSON字符串数组
    const jsonArrayAfterRemoval = filteredArray.map(JSON.stringify);

    return jsonArrayAfterRemoval;
  }

  function setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  function getLocalStorage(key: string) {
    return localStorage.getItem(key);
  }
  // 名字长度判断
  function truncateAndMask(name: string, maxLength = 16) {
    if (name.length <= maxLength) {
      // 如果名字长度小于等于最大长度，直接返回名字
      return name;
    } else {
      // 如果名字长度超过最大长度，截断并添加星号
      return name.substring(0, maxLength) + "****";
    }
  }

  // 打开注册
  function showRegister() {
    isShowRegister = true;
    isShowLogin = false;
    isShowLoginOther = false;
    isUserChecked = false;
    // password = "";
    showBack = false;
  }
  // 谷歌登录
  function googleLogin() {
    // 调用谷歌登录按钮
    // 渲染“使用 Google 帐号登录”按钮
    google.accounts.id.renderButton(googleButton, {
      type: "icon",
      theme: "outline",
      size: "medium",
      text: "signin_with",
      shape: "circle",
    });
  }
  // 显示第三方登录谷歌，脸书
  function showLoginOther() {
    if (initData.socialLoginState === "0") {
      isShowLoginOther = false;
    } else {
      loginTypes = initData.socialLoginTypes.split(",");
      isShowLoginOther = true;
    }
    googleStatus = 0;
    // let timer = setTimeout(() => {
    //   if (googleButton) {
    //     googleLogin();
    //   } else {
    //     tick().then(() => {
    //       if (googleButton) {
    //         googleLogin();
    //       }
    //     });
    //   }
    //   clearTimeout(timer);
    // }, 100);
  }

  //注册
  function toRegister() {
    if (!theUsername) {
      showTooltip($t("sf_hint_account_check"));
      return;
    }
    if (!regex.test(theUsername)) {
      showTooltip($t("sf_hint_account_check"));
      return;
    }
    if (!thePassword) {
      showTooltip($t("sf_hint_password_check"));
      return;
    }
    if (!regex.test(thePassword)) {
      showTooltip($t("sf_hint_password_check"));
      return;
    }
    if (!isUserChecked) {
      showTooltip(
        $t("sf_account_protocol_check") +
          $t("sf_protocol_user") +
          $t("sf_and_joiner") +
          $t("sf_protocol_title")
      );
      return;
    }
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/usersf/sofishregister",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      username: theUsername,
      password: thePassword,
      uid: userLoginInfo.uid,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        closeLoginModal();
        setUserLoginInfo(responseData.data);
        toSwitchAccount(
          truncateAndMask(responseData.data.loginName) + $t("sf_login_welcome"),
          0
        );
        isLogin = true;
        reporting("sdk_register", reportInfoValue);
        fb_report_payment(
          {
            eventName: "CompleteRegistration",
          },
          1
        );
        ta_userSet("h5");
        if (typeof onLoginSuccess === "function") {
          onLoginSuccess(responseData.data);
        }
      },
      onCodeFail(responseData) {
        showLoader = false;
        loserReason(responseData);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
  }

  //登陆
  function toLogin() {
    if (!theUsername) {
      showTooltip($t("sf_hint_account_check"));
      return;
    }
    if (!regex.test(theUsername)) {
      showTooltip($t("sf_hint_account_check"));
      return;
    }
    if (!thePassword) {
      showTooltip($t("sf_hint_password_check"));
      return;
    }
    if (!regex.test(thePassword)) {
      showTooltip($t("sf_hint_password_check"));
      return;
    }
    reporting("sdk_login_begin", { account_type: 7 });
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/usersf/sofishlogin",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      // deviceID:uniqueString,
      username: theUsername,
      password: thePassword,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        // showTooltip($t("other.login_success"));
        closeLoginModal();
        setUserLoginInfo(responseData.data);
        toSwitchAccount(
          truncateAndMask(responseData.data.loginName) + $t("sf_login_welcome"),
          0
        );
        ta_login(responseData.data.uid);
        af_login(responseData.data.uid);
        reporting("sdk_login_success", reportInfoValue);
        isLogin = true;
        if (typeof onLoginSuccess === "function") {
          onLoginSuccess(responseData.data);
        }
      },
      onCodeFail(responseData) {
        showLoader = false;
        loserReason(responseData);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
  }

  function forgotPassword() {
    isShowGetPassWord = true;
  }
  function closeGetPassWord() {
    isShowGetPassWord = false;
  }
  function submitRest() {
    if (!regex.test(passwordReset)) {
      showTooltip($t("sf_hint_password_check"));
      return;
    }
    if (!passEmailOtp) {
      showTooltip($t("sf_email_code_tip"));
      return;
    }

    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/usersf/sofishresertpassword",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      code: passEmailOtp,
      username: passUserName,
      password: passwordReset,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        showTooltip($t("sf_reset_password_success"));
        closePasswordResetWord();
        localStorage.removeItem(userLoginInfoKey);
        isLogin = false;
      },
      onCodeFail: (responseData: any) => {
        showLoader = false;
        loserReason(responseData);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
  }
  function submitNext() {
    if (!regex.test(passUserName)) {
      showTooltip($t("sf_reset_password_desc"));
      return;
    }
    if (!emailRegex.test(passEmail)) {
      showTooltip($t("sf_reset_password_desc"));
      return;
    }
    //
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/usersf/sofishifbindemail",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      username: passUserName,
      email: passEmail,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        isShowResetPassWord = true;
      },
      onCodeFail: (responseData: any) => {
        showLoader = false;
        loserReason(responseData);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
    //
  }
  function submitUserNameNext() {
    if (!emailRegex.test(userNameEmail)) {
      showTooltip($t("sf_hint_email_check"));
      return;
    }

    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/usersf/sofishfinduser",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      email: userNameEmail,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        isShowUserName = true;
        theUserNameData = responseData.data;
      },
      onCodeFail: (responseData: any) => {
        showLoader = false;
        loserReason(responseData);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
  }
  function closePasswordResetWord() {
    eyeShow = true;
    inputType = "password";
    passEmailOtp = "";
    passwordReset = "";
    isShowGetPassWord = false;
    isShowResetPassWord = false;
  }
  function closeGetUserName() {
    isShowGetUserName = false;
  }
  function closeUserName() {
    isShowGetUserName = false;
    isShowUserName = false;
  }

  function getUserName() {
    isShowOverlay = true;
    isShowGetUserName = true;
  }
  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      showTooltip($t("sf_copy_success"));
    } catch (err) {
      console.error(err);
    }
  }
  function eCopyToClipboard(event: CustomEvent) {
    copyToClipboard(event.detail);
  }
  function copyAndLogin() {
    isShowGetPassWord = false;
    isShowGetUserName = false;
    isShowUserName = false;
    copyToClipboard(theUserNameData.username);
  }
  function contactCustomer() {
    closeGetPassWord();
    closeLoginModal();
    closePasswordResetWord();
    closeGetUserName();
    closeUserName();
    closeFAQ();
    openCustomerService();
    // showTooltip("功能还没实现哦");
  }
  // 切换登录，自动登录
  function toSwitchLogin() {
    showHistoryAccountList = false;
    userLoginInfo = theHistoryUserInfo;
    reporting("sdk_login_begin", { account_type: userLoginInfo.accountType });
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/user/autoLogin",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      deviceID: uniqueString,
      uid: userLoginInfo.uid,
      token: userLoginInfo.token,
      username: userLoginInfo.name,
      accountType: userLoginInfo.accountType,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        closeLoginModal();
        closeSwitchModal();
        setUserLoginInfo(responseData.data);
        toSwitchAccount(
          truncateAndMask(responseData.data.loginName) + $t("sf_login_welcome"),
          0
        );
        isLogin = true;
        ta_login(responseData.data.uid);
        af_login(responseData.data.uid);
        reporting("sdk_login_success", reportInfoValue);
        if (typeof onLoginSuccess === "function") {
          onLoginSuccess(responseData.data);
        }
      },
      onCodeFail: (responseData: any) => {
        showLoader = false;
        loserReason(responseData);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
  }

  function closeLoginModal() {
    eyeShow = true;
    inputType = "password";
    isShowLoginRegister = false;
    isShowOverlay = false;
  }
  function closeSwitchModal() {
    isShowSwitchAccount = false;
    isShowOverlay = false;
    showHistoryAccountList = false;
  }

  // 第三方登录
  function toPlatformLogin(
    _accountType: number,
    accountId: string | number,
    _loginName: null | string,
    _extraData?: any
  ) {
    showLoader = true;
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/user/platformLogin",
    };
    let once_query = {
      appID: appID,
      timestamp: nowTimeStamp(),
      deviceID: uniqueString,
      accountType: _accountType,
      accountID: accountId,
    } as RequestQueryType;
    if (_loginName !== null) {
      once_query.loginName = _loginName;
    }
    if (_accountType === 3 || _accountType === 4 || _accountType === 5) {
      once_query.extraData = _extraData;
    }
    reporting("sdk_login_begin", { account_type: _accountType });
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        closeLoginModal();
        isLogin = true;
        setUserLoginInfo(responseData.data);
        showLoader = false;
        toSwitchAccount(
          truncateAndMask(responseData.data.loginName) + $t("sf_login_welcome"),
          1
        );
        ta_login(responseData.data.uid);
        af_login(responseData.data.uid);
        if (responseData.data.newAccount == 1) {
          fb_report_payment(
            {
              eventName: "CompleteRegistration",
            },
            1
          );
          ta_userSet("h5");
          reporting("sdk_register", reportInfoValue);
        } else {
          reporting("sdk_login_success", reportInfoValue);
        }
        if (typeof onLoginSuccess === "function") {
          onLoginSuccess(responseData.data);
        }
      },
      onCodeFail: (responseData: any) => {
        showLoader = false;
        loserReason(responseData);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
  }
  function whereVisitorLogin() {
    userLoginInfoList = JSON.parse(getLocalStorage(userLoginInfoListKey) + "");
    let visitorInfo = userLoginInfoList?.find((item: any) => {
      let newItem = JSON.parse(item);
      return newItem.accountType == 1;
    });
    if (visitorInfo) {
      theHistoryUserInfo = JSON.parse(visitorInfo);
      toSwitchLogin();
    } else {
      showTooltip($t("sf_login_type_not_support"));
    }
  }
  function autoLoginReFlushToken() {
    let flag = true;
    //取登陆信息
    userLoginInfo = getLocalStorage(userLoginInfoKey);
    if (whetherLogin()) {
      flag = true;
      reporting("sdk_refresh_token", reportInfoValue);
      const once_config: RequestConfigType = {
        ...often_config,
        truthUrl: "/user/autoLoginreflushtoken",
      };
      const once_query: RequestQueryType = {
        appID: appID,
        timestamp: nowTimeStamp(),
        deviceID: uniqueString,
        uid: userLoginInfo.uid,
        token: userLoginInfo.token,
        username: userLoginInfo.name,
        accountType: userLoginInfo.accountType,
      };
      const once_resHandler: ResponseHandlerType = {
        ...often_resHandler,
        onSuccess: (responseData) => {
          setUserLoginInfo(responseData.data);
          if (typeof onLoginSuccess === "function") {
            onLoginSuccess(responseData.data);
          }
          ta_login(responseData.data.uid);
          af_login(responseData.data.uid);
          reporting("sdk_refresh_token_success", reportInfoValue);
        },
        onCodeFail: (responseData: any) => {
          toPlatformLogin(1, uniqueString, null);
          reporting("sdk_refresh_token_failed", {
            ...reportInfoValue,
            http_code: responseData.code,
            http_message: responseData.msg,
          });
        },
      };
      sdkRequest(once_config, once_query, once_resHandler);
      toSwitchAccount(
        truncateAndMask(userLoginInfo.loginName) + $t("sf_login_welcome"),
        1
      );
      closeSwitchModal();
    } else {
      flag = false;
    }

    return flag;
  }
  function showEmail() {
    isShowOverlay = true;
    isLogOff = true;
    isEmailBind = false;
    sendTrue = false;
    isShowEmail = true;
    theEmail = "";
  }
  function closeEmail() {
    isShowEmail = false;
    emailOtp = "";
    sendTrue = false;
    isShowOverlay = false;
  }

  function confirmOff() {
    isShowSwitchAccount = false;
    showHistoryAccountList = false;
    isSwitchAccount = false;
    isLogin = false;
    localStorage.removeItem(userLoginInfoKey);
    whetherLogin();
    isShowEmailTips = false;
    isShowOverlay = false;
    if (typeof onLogOffSuccess === "function") {
      onLogOffSuccess();
    }
  }
  //
  function submitLogOff() {
    if (!emailRegex.test(theEmail)) {
      showTooltip($t("sf_hint_email_check"));
      return;
    }

    if (!emailOtp) {
      showTooltip($t("sf_email_code_tip"));
      return;
    }
    if (!isLogOffChecked) {
      showTooltip(
        $t("sf_account_protocol_check") + $t("sf_cancel_account_protocol")
      );
      return;
    }
    //
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/user/cancel",
    };
    const yet_timestamp = nowTimeStamp();
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      deviceID: uniqueString,
      accountType: userLoginInfo.accountType,
      username: userLoginInfo.name,
      token: userLoginInfo.token,
      uid: userLoginInfo.uid,
      code: emailOtp,
      email: theEmail,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        emailTips = responseData.data;
        isShowEmailTips = true;
        isShowEmail = false;
        sendTrue = false;
        isShowOverlay = true;
        reporting("sdk_deleted_account", {
          success: true,
          create_time: yet_timestamp,
          cancel_time: nowTimeStamp(),
        });
      },
      onCodeFail: (responseData: any) => {
        showLoader = false;
        loserReason(responseData);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
    //
  }
  function logOffCheckboxChange() {}
  function notDebounceSendEmail(event: CustomEvent) {
    const { flag, email } = event.detail;
    if (!emailRegex.test(email)) {
      showTooltip($t("sf_hint_email_check"));
      emailTimeShow = false;
      return;
    }
    if (flag !== "password") {
      if (!isLogOffChecked) {
        showTooltip($t("sf_cancel_account_protocol_check"));
        emailTimeShow = false;
        return;
      }
    }
    // if (emailTimeShow) return;
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/user/emailCode",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      // deviceID:uniqueString,
      validType: 0,
      email: email,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        showTooltip($t("sf_email_sent"));
        // 倒计时60；
        sendTrue = true;
        emailTimeShow = true;
        reporting("sdk_email_verify", {
          success: true,
          email_address: email,
          verify_type: flag,
        });
        startCountdown(60, 1);
      },
      onCodeFail: (responseData: any) => {
        showLoader = false;
        loserReason(responseData);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
  }

  //注销账号
  function toLogOff() {
    if (whetherLogin()) {
      isShowOverlay = true;
      showConfirm(
        $t("sf_cancel_account_title"),
        $t("sf_cancel_account_desc"),
        showEmail
      );
    } else {
      showTooltip($t("sf_user_not_login"));
    }
  }

  function closeUpdateAccounted() {
    isShowUpdateAccounted = false;
    isShowOverlay = false;
    showLoader = false;
  }
  function closeUpdateAccount() {
    isShowUpdateAccount = false;
    isShowOverlay = false;
    showLoader = false;
  }
  function closeBindAccount() {
    isShowOverlay = false;
    showLoader = false;
    isBindAccount = false;
  }
  function closePrivacyPolicy() {
    isPrivacyPolicy = false;
    isShowOverlay = false;
    showLoader = false;
  }
  function closeCustomerService() {
    // tabActive = 1;
    isCustomerService = false;
    isShowOverlay = false;
    showLoader = false;
  }
  function closeBindAccounted() {
    isShowBindAccounted = false;
    isBindAccount = true;
    showLoader = false;
  }
  function toCloseBindEmailAccounted() {
    isShowEmail = false;
    emailOtp = "";
    sendTrue = false;
  }
  function registerAndBind() {
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/usersf/sofishregister",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      username: theUsername,
      password: thePassword,
      uid: userLoginInfo.uid,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        setUserLoginInfo(responseData.data);
        whetherLogin();
        isShowUpdateAccount = false;
        isShowOverlay = false;
      },
      onCodeFail: (responseData: any) => {
        showLoader = false;
        loserReason(responseData);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
    //
  }
  function confirmUpdateAccount() {
    if (!theUsername) {
      showTooltip($t("sf_hint_account_check"));
      return;
    }
    if (!regex.test(theUsername)) {
      showTooltip($t("sf_hint_account_check"));
      return;
    }
    if (!thePassword) {
      showTooltip($t("sf_hint_password_check"));
      return;
    }
    if (!regex.test(thePassword)) {
      showTooltip($t("sf_hint_password_check"));
      return;
    }
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/usersf/sofishbind",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      uid: userLoginInfo.uid,
      username: theUsername,
      password: thePassword,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        setUserLoginInfo(responseData.data);
        whetherLogin();
        isShowOverlay = false;
        isShowUpdateAccount = false;
      },
      onCodeFail: (responseData: any) => {
        showLoader = false;
        if (responseData.code === 1030) {
          showConfirm(
            $t("sf_user_upgrade_account"),
            $t("sf_error_1030"),
            registerAndBind
          );
        } else {
          loserReason(responseData);
        }
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
  }

  function copyAccount() {
    isShowOverlay = false;
    isShowUpdateAccounted = false;
    copyToClipboard(accountLoginName);
  }
  // 打开账号绑定页面
  function accountBind() {
    getUserDetail(1);
  }
  function privacyPolicy() {
    isPrivacyPolicy = true;
    isShowOverlay = true;
  }
  function customerService() {
    isCustomerService = true;
    isShowOverlay = true;
  }
  function getUserDetail(timing?: number) {
    if (timing === 1) {
      showLoader = true;
    }
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/user/detail",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      uid: userLoginInfo.uid,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        setLocalStorage(userDetailKey, JSON.stringify(responseData.data));
        showLoader = false;
        if (timing === 1) {
          isBindAccount = true;
          isShowOverlay = true;
        }
      },
      onCodeFail: (responseData: any) => {
        showLoader = false;
        loserReason(responseData);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
    //
  }
  // 账号升级
  function updateAccount() {
    showLoader = true;
    if (whetherLogin()) {
      if (isUserDetailBind(7)) {
        isShowOverlay = true;
        accountTitle = $t("sf_user_upgrade_account");
        isShowUpdateAccounted = true;
        theUsername = "";
        thePassword = "";
      } else {
        isShowUpdateAccount = true;
        isShowOverlay = true;
        theUsername = "";
        thePassword = "";
      }
    } else {
      showTooltip($t("sf_user_not_login"));
    }
    showLoader = false;
  }

  function bindEmail() {
    showLoader = true;
    // if (userLoginInfo?.accountType == 1) {
    //   showLoader = false;
    //   showTooltip($t("sf_reset_password_back"));
    //   isBindAccount = false;
    //   showLoginModalOther();
    //   return;
    // }
    if (whetherLogin()) {
      if (isUserDetailBind(2)) {
        // accountType = 2;
        accountTitle = $t("sf_unlink_title");
        isBindAccount = false;
        isShowBindAccounted = true;
        deleteEmail = false;
        typeName = $t("sf_social_email");
      } else {
        isLogOff = false;
        isEmailBind = true;
        sendTrue = false;
        isShowEmail = true;
        emailOtp = "";
        theEmail = "";
      }
    } else {
      showTooltip($t("sf_user_not_login"));
    }
    showLoader = false;
  }

  function submitEmailBind() {
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/usersf/sofishbindemail",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      uid: userLoginInfo.uid,
      code: emailOtp,
      email: theEmail,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        showTooltip($t("sf_link_done_email"));
        getUserDetail();
        isShowEmail = false;
        accountTitle = $t("sf_unlink_title");
        typeName = $t("sf_social_email");
        accountLoginName = theEmail;
        isBindAccount = false;
        isShowBindAccounted = true;
      },
      onCodeFail: (responseData: any) => {
        showLoader = false;
        loserReason(responseData);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
    //
  }
  function deleteBindAccount(event: CustomEvent) {
    const { theAccountType } = event.detail;
    deleteEmail = true;
    sendTrue = false;
    emailOtp = "";
  }

  function deleteEmailBindAccount() {
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/usersf/sofishdeletebindemail",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      uid: userLoginInfo.uid,
      code: emailOtp,
      email: accountLoginName,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        showTooltip($t("sf_unlink_success"));
        getUserDetail();
        isShowEmail = false;
        deleteEmail = false;
        isBindAccount = false;
        isShowOverlay = false;
        isShowBindAccounted = false;
      },
      onCodeFail: (responseData: any) => {
        showLoader = false;
        loserReason(responseData);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
    //
    //
  }
  //判断UserDetail信息
  function isUserDetailBind(_accountType: number, judge?: number) {
    var bindFlag = false;
    userDetail = localStorage.getItem(userDetailKey);
    if (userDetail !== null) {
      userDetail = JSON.parse(userDetail);
      userDetail.forEach(function (account: {
        accountType: any;
        loginName: any;
        name: any;
      }) {
        if (account.accountType === _accountType) {
          if (judge === 1) {
            bindFlag = true;
            return;
          } else {
            accountLoginName = account.loginName;
            if (_accountType === 7) {
              accountName = account.name;
            }
            bindFlag = true;
            return;
          }
        }
      });
    }
    return bindFlag;
  }
  //判断是否登陆
  function whetherLogin() {
    //取登陆信息
    userLoginInfo = getLocalStorage(userLoginInfoKey);
    if (userLoginInfo !== null) {
      userLoginInfo = JSON.parse(userLoginInfo);
      theHistoryUserInfo = userLoginInfo;
      const tmp = nowTimeStamp() - userLoginInfo.timestamp;
      if (tmp / 1000 < userLoginInfo.expiredTime) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function decodeJwtResponse(token: any) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  //打开用户隐私协议
  function openPrivacyPolicy() {
    window.open("https://www.sofish.com/privacy-policy.html", "_blank");
  }
  //打开用户服务协议
  function openPrivacyPolicyUer() {
    window.open("https://www.sofish.com/terms-of-service.html", "_blank");
  }

  function openCommunity(event: CustomEvent) {
    const { link } = event.detail;
    window.open(link, "_blank");
  }
  //打开客服中心
  function openCustomerService() {
    appLang = sessionStorage.getItem("localeLanguage") || appLang;
    const data = {
      appId: appID,
      appLang: appLang, //语言编码
      commonBaseUrl: initData.customerServiceBaseUrl, // 接口地址文件json
      imei: uniqueString, //设备标识
      roleID: sdkRoleConfig.roleID || "", //角色id,未登录时传空
      token: userLoginInfo.token || "", //登录后的token，,未登录时传空
      uId: userLoginInfo.uid || "", //用户id,未登录时传空
    };

    // 将对象转换为 JSON 格式
    const jsonData = JSON.stringify(data);
    // Base64加密
    const base64Data = Base64.encode(jsonData);
    window.open(initData.customerServiceJumpUrl + base64Data, "_blank");
  }
  // 脸书绑定与解绑
  function toBindFacebook(bindType: number, timing?: string) {
    if (whetherLogin()) {
      FB.login(
        function (res_fb: any) {
          showLoader = true;
          facebookLoginInfo = {};
          facebookLoginInfo = res_fb;
          if (!res_fb.authResponse) {
            showLoader = false;
            return;
          }
          const _access = res_fb.authResponse.accessToken;
          if (res_fb.authResponse) {
            FB.api(
              "/me",
              {
                fields: "id,name,email,picture,token_for_business",
                access_token: _access,
              },
              function (res_facebookInfo: any) {
                if (res_facebookInfo) {
                  facebookInfo = {};
                  facebookInfo = res_facebookInfo;
                  if (bindType == 1) {
                    reporting("sdk_link_begin", {
                      account_type: 4,
                      user_name: facebookInfo.name || uniqueString,
                    });
                    const once_config: RequestConfigType = {
                      ...often_config,
                      truthUrl: "/user/platformBind",
                    };
                    const once_query: RequestQueryType = {
                      appID: appID,
                      timestamp: nowTimeStamp(),
                      accountType: 4,
                      accountID:
                        facebookInfo.id + "|" + facebookInfo.token_for_business,
                      loginName: facebookInfo.name || uniqueString,
                      extraData: facebookLoginInfo.authResponse.accessToken,
                      deviceID: uniqueString,
                      channelID: platformTypeId,
                      oldAccountType: userLoginInfo.accountType,
                      oldName: userLoginInfo.name,
                      token: userLoginInfo.token,
                      uid: userLoginInfo.uid,
                    };
                    const once_resHandler: ResponseHandlerType = {
                      ...often_resHandler,
                      onSuccess: (responseData) => {
                        isBindAccount = false;
                        showLoader = false;
                        isShowOverlay = false;
                        isVisitorLoginAccount = false;
                        getUserDetail();
                        setUserLoginInfo(responseData.data);
                        showTooltip($t("sf_link_done_facebook"));
                        reporting("sdk_link_success", reportInfoValue);
                      },
                      onCodeFail: (responseData: any) => {
                        isBindAccount = false;
                        showLoader = false;
                        isShowOverlay = false;
                        isVisitorLoginAccount = false;
                        if (timing === "start" && responseData.code === 1011) {
                          sessionStorage.setItem(
                            "facebookInfo",
                            JSON.stringify(facebookInfo)
                          );
                          toPlatformLogin(
                            4,
                            res_facebookInfo.id +
                              "|" +
                              res_facebookInfo.token_for_business,
                            res_facebookInfo.name,
                            res_fb.authResponse.accessToken
                          );
                        } else {
                          loserReason(responseData);
                        }
                      },
                    };
                    sdkRequest(once_config, once_query, once_resHandler);
                  } else {
                    // 解绑操作
                    const once_config: RequestConfigType = {
                      ...often_config,
                      truthUrl: "/usersf/sofishdeletebindlogin",
                    };
                    const once_query: RequestQueryType = {
                      appID: appID,
                      timestamp: nowTimeStamp(),
                      accountType: 4,
                      accountID:
                        facebookInfo.id + "|" + facebookInfo.token_for_business,
                      extraData: facebookLoginInfo.authResponse.accessToken,
                      uid: userLoginInfo.uid,
                    };
                    const once_resHandler: ResponseHandlerType = {
                      ...often_resHandler,
                      onSuccess: (responseData) => {
                        isBindAccount = false;
                        showUnbindFacebook = false;
                        showLoader = false;
                        isShowOverlay = false;
                        getUserDetail();
                        showTooltip($t("sf_unlink_success"));
                      },
                      onCodeFail: (responseData: any) => {
                        isBindAccount = false;
                        showUnbindFacebook = false;
                        showLoader = false;
                        isShowOverlay = false;
                        loserReason(responseData);
                      },
                    };
                    sdkRequest(once_config, once_query, once_resHandler);
                  }
                } else {
                  showLoader = false;
                  showTooltip($t("sf_error_1012"));
                }
              }
            );
          } else {
            showLoader = false;
            showTooltip($t("sf_error_1012"));
          }
        },
        {
          scope: "public_profile,email,user_friends", // 这里指定你需要的权限
        }
      );
    } else {
      showLoader = false;
      showTooltip($t("sf_user_not_login"));
    }
  }
  function whereBindFacebook(event: CustomEvent) {
    const { bindType } = event.detail;
    toBindFacebook(bindType);
  }
  // ?脸书登录x
  function FBLogin() {
    FB.login(
      function (res_fb: { authResponse: { accessToken: any } }) {
        showLoader = true;
        if (!res_fb.authResponse) {
          showLoader = false;
          return;
        }
        facebookLoginInfo = res_fb;
        const _access = res_fb.authResponse.accessToken;
        if (res_fb.authResponse) {
          // console.log('Welcome!  Fetching your information.... ');
          FB.api(
            "/me",
            {
              fields: "id,name,email,picture,token_for_business",
              access_token: _access,
            },
            function (response: any) {
              showLoader = false;
              if (response) {
                facebookInfo = response;
                sessionStorage.setItem(
                  "facebookInfo",
                  JSON.stringify(facebookInfo)
                );
                toPlatformLogin(
                  4,
                  response.id + "|" + response.token_for_business,
                  response.name,
                  res_fb.authResponse.accessToken
                );
              } else {
                showTooltip($t("sf_error_1006"));
              }
            }
          );
        } else {
          showLoader = false;
          showTooltip($t("sf_error_1006"));
        }
      },
      {
        scope: "public_profile,email,user_friends", // 这里指定你需要的权限
      }
    );
  }
  // 谷歌绑定与解绑函数
  function justBindGoogle(
    googleParm: any,
    bindType: number,
    google_credential: any,
    timing?: string
  ) {
    showLoader = true;
    if (bindType === 1) {
      reporting("sdk_link_begin", {
        account_type: 3,
        user_name: googleParm.displayName || uniqueString,
      });
      const once_config: RequestConfigType = {
        ...often_config,
        truthUrl: "/user/platformBind",
      };
      const once_query: RequestQueryType = {
        appID: appID,
        timestamp: nowTimeStamp(),
        accountType: 3,
        accountID: googleParm.providerData[0].uid || "",
        loginName: googleParm.displayName || uniqueString,
        extraData: google_credential || "",
        deviceID: uniqueString,
        channelID: platformTypeId,
        oldAccountType: userLoginInfo.accountType,
        oldName: userLoginInfo.name,
        token: userLoginInfo.token,
        uid: userLoginInfo.uid,
      };
      const once_resHandler: ResponseHandlerType = {
        ...often_resHandler,
        onSuccess: (responseData) => {
          isBindAccount = false;
          showGoogleBind = false;
          showLoader = false;
          isShowOverlay = false;
          isVisitorLoginAccount = false;
          getUserDetail();
          setUserLoginInfo(responseData.data);
          reporting("sdk_link_success", reportInfoValue);
          showTooltip($t("sf_link_done_google"));
        },
        onCodeFail: (responseData: any) => {
          isBindAccount = false;
          showGoogleBind = false;
          showLoader = false;
          isShowOverlay = false;
          isVisitorLoginAccount = false;
          if (responseData.code === 1011 && timing === "start") {
            toPlatformLogin(
              3,
              googleParm.providerData[0].uid,
              googleParm.displayName,
              google_credential
            );
          } else {
            loserReason(responseData);
          }
        },
      };
      sdkRequest(once_config, once_query, once_resHandler);
    } else {
      const once_config: RequestConfigType = {
        ...often_config,
        truthUrl: "/usersf/sofishdeletebindlogin",
      };
      const once_query: RequestQueryType = {
        appID: appID,
        timestamp: nowTimeStamp(),
        accountType: 3,
        accountID: googleParm.providerData[0].uid || "",
        extraData: google_credential || "",
        uid: userLoginInfo.uid,
      };
      const once_resHandler: ResponseHandlerType = {
        ...often_resHandler,
        onSuccess: (responseData) => {
          isBindAccount = false;
          showUnbindGoogle = false;
          showLoader = false;
          isShowOverlay = false;
          getUserDetail();
          showTooltip($t("sf_unlink_success"));
        },
        onCodeFail: (responseData: any) => {
          isBindAccount = false;
          showUnbindGoogle = false;
          showLoader = false;
          isShowOverlay = false;
          loserReason(responseData);
        },
      };
      sdkRequest(once_config, once_query, once_resHandler);
    }
  }
  function fire_google(param: number, timing?: string) {
    showLoader = true;
    signInWithPopup(fireAuth, fireProvider)
      .then((result) => {
        let credential = GoogleAuthProvider.credentialFromResult(result);
        const _token = credential!.idToken;
        showLoader = false;
        if (param === 0) {
          toPlatformLogin(
            3,
            result.user.providerData[0].uid,
            result.user.displayName,
            _token
          );
        } else if (param === 1) {
          justBindGoogle(result.user, 1, _token, timing);
        } else if (param === 2) {
          justBindGoogle(result.user, 2, _token);
        }
      })
      .catch((error) => {
        showLoader = false;
        if (param === 0) {
          showTooltip($t("sf_error_1006"));
        } else if (param === 1) {
          showTooltip($t("sf_error_1012"));
        } else if (param === 2) {
          showTooltip($t("sf_error_1031"));
        }
      });
  }
  // !谷歌回调函数
  // function handleCredentialResponse(response: any) {
  //   if (response.credential) {
  //     const responsePayload = decodeJwtResponse(response.credential);
  //     googleInfo = responsePayload;
  //     if (googleStatus === 0) {
  //       toPlatformLogin(
  //         3,
  //         responsePayload.sub,
  //         responsePayload.name,
  //         response.credential
  //       );
  //     } else if (googleStatus === 1) {
  //       justBindGoogle(googleInfo, 1, response);
  //     } else if (googleStatus === 2) {
  //       justBindGoogle(googleInfo, 2, response);
  //     }
  //   } else {
  //     showTooltip($t("sf_error_1006"));
  //   }
  // }
  const toLoginIOS = async () => {
    try {
      showLoader = true;
      const iosData = await AppleID.auth.signIn();
      iosLoginInfo = iosData;
      const responsePayload = decodeJwtResponse(iosData.authorization.id_token);
      sessionStorage.setItem("iosUserInfo", JSON.stringify(responsePayload));
      showLoader = false;
      toPlatformLogin(
        5,
        responsePayload.sub,
        uniqueString?.slice(0, 9) || "",
        iosData.authorization.id_token
      );
    } catch (error: any) {
      showLoader = false;
      showTooltip($t("sf_error_1006"));
    }
  };
  const toBindIOS = async (timing?: string) => {
    try {
      showLoader = true;
      const iosData = await AppleID.auth.signIn();
      iosLoginInfo = iosData;
      const responsePayload = decodeJwtResponse(iosData.authorization.id_token);
      reporting("sdk_link_begin", {
        account_type: 5,
        user_name: uniqueString,
      });
      const once_config: RequestConfigType = {
        ...often_config,
        truthUrl: "/user/platformBind",
      };
      const once_query: RequestQueryType = {
        appID: appID,
        timestamp: nowTimeStamp(),
        accountType: 5,
        accountID: responsePayload.sub || "",
        loginName: uniqueString,
        extraData: iosData.authorization.id_token || "",
        deviceID: uniqueString,
        channelID: platformTypeId,
        oldAccountType: userLoginInfo.accountType,
        oldName: userLoginInfo.name,
        token: userLoginInfo.token,
        uid: userLoginInfo.uid,
      };
      const once_resHandler: ResponseHandlerType = {
        ...often_resHandler,
        onSuccess: (responseData) => {
          isBindAccount = false;
          showGoogleBind = false;
          showLoader = false;
          isShowOverlay = false;
          isVisitorLoginAccount = false;
          getUserDetail();
          setUserLoginInfo(responseData.data);
          reporting("sdk_link_success", reportInfoValue);
          showTooltip($t("other.sf_link_done_apple"));
        },
        onCodeFail: (responseData: any) => {
          isBindAccount = false;
          showGoogleBind = false;
          showLoader = false;
          isShowOverlay = false;
          isVisitorLoginAccount = false;
          if (timing === "start" && responseData.code === 1011) {
            toPlatformLogin(
              5,
              responsePayload.sub,
              uniqueString || "",
              iosData.authorization.id_token
            );
          } else {
            loserReason(responseData);
          }
        },
      };
      sdkRequest(once_config, once_query, once_resHandler);
    } catch (error: any) {
      showLoader = false;
      showTooltip($t("sf_error_1012"));
    }
  };
  const whereBindIOS = async (e: CustomEvent) => {
    await toBindIOS();
  };
  const toUnBindIOS = async () => {
    try {
      showLoader = true;
      const iosData = await AppleID.auth.signIn();
      iosLoginInfo = iosData;
      const responsePayload = decodeJwtResponse(iosData.authorization.id_token);
      const once_config: RequestConfigType = {
        ...often_config,
        truthUrl: "/usersf/sofishdeletebindlogin",
      };
      const once_query: RequestQueryType = {
        appID: appID,
        timestamp: nowTimeStamp(),
        accountType: 5,
        accountID: responsePayload.sub || "",
        extraData: iosData.authorization.id_token || "",
        uid: userLoginInfo.uid,
      };
      const once_resHandler: ResponseHandlerType = {
        ...often_resHandler,
        onSuccess: (responseData) => {
          isBindAccount = false;
          showUnbindGoogle = false;
          showLoader = false;
          isShowOverlay = false;
          getUserDetail();
          showTooltip($t("sf_unlink_success"));
        },
        onCodeFail: (responseData: any) => {
          isBindAccount = false;
          showUnbindGoogle = false;
          showLoader = false;
          isShowOverlay = false;
          loserReason(responseData);
        },
      };
      sdkRequest(once_config, once_query, once_resHandler);
    } catch (error: any) {
      showLoader = false;
      showTooltip($t("sf_error_1031"));
    }
  };
  // 打开第三方登录,脸书登录谷歌登录
  function showLoginModalOther() {
    isShowSwitchAccount = false;
    isShowLoginRegister = true;
    showHistoryAccountList = false;
    isShowRegister = false;
    isShowLogin = true;
    showLoginOther();
    if (getLocalStorage(userLoginInfoKey) !== null) {
      showBack = true;
    } else {
      showBack = false;
    }
  }
  $: customerProps = {
    showCustomerServiceFAQ: showCustomerServiceFAQ,
    png64: png64,
    customerServiceFaqList: customerServiceFaqList,
    customerServiceFaqReply: customerServiceFaqReply,
    isCustomerService: isCustomerService,
    communityFacebook: initData.communityFacebook,
    communityDiscord: initData.communityDiscord,
  };
  $: agreementProps = {
    isPrivacyPolicy: isPrivacyPolicy,
    png64: png64,
    showLogoutAgreement: showLogoutAgreement,
    logoutAgreementTitle: logoutAgreementTitle,
    logoutAgreementStatus: logoutAgreementStatus,
    isLogoutAgreementCondition: isLogoutAgreementCondition,
    isLogoutAgreementRead: isLogoutAgreementRead,
  };
  $: userNameDataUsername = theUserNameData?.username;
  $: passwordProps = {
    isShowGetPassWord: isShowGetPassWord,
    png64: png64,
    passUserName: passUserName,
    passEmail: passEmail,
    isShowResetPassWord: isShowResetPassWord,
    passEmailOtp: passEmailOtp,
    emailTimeShow: emailTimeShow,
    emailTimeCount: emailTimeCount,
    emailText: emailText,
    eyeShow: eyeShow,
    passwordReset: passwordReset,
    isShowGetUserName: isShowGetUserName,
    userNameEmail: userNameEmail,
    isShowUserName: isShowUserName,
    userNameDataUsername: userNameDataUsername,
  };
  $: bindProps = {
    isShowEmail: isShowEmail,
    png64: png64,
    isEmailBind: isEmailBind,
    isLogOff: isLogOff,
    email: theEmail,
    emailOtp: emailOtp,
    emailTimeShow: emailTimeShow,
    emailTimeCount: emailTimeCount,
    emailText: emailText,
    isLogOffChecked: isLogOffChecked,
    isShowBindAccounted: isShowBindAccounted,
    accountTitle: accountTitle,
    deleteEmail: deleteEmail,
    typeName: typeName,
    accountLoginName: accountLoginName,
    deleteEmailBindAccount: deleteEmailBindAccount,
    accountType: userLoginInfo?.accountType,
    isBindAccount: isBindAccount,
    userDetailKey: userDetailKey,
  };
  $: accountProps = {
    isShowSwitchAccount: isShowSwitchAccount,
    png64: png64,
    historyImgs: historyImgs,
    theHistoryUserInfo: theHistoryUserInfo,
    showHistoryAccountList: showHistoryAccountList,
    userLoginInfoList: userLoginInfoList,
    isShowEmailTips: isShowEmailTips,
    emailTips: emailTips,
    isShowUpdateAccounted: isShowUpdateAccounted,
    userLoginInfo: userLoginInfo,
    accountLoginName: accountLoginName,
    isShowUpdateAccount: isShowUpdateAccount,
    theUsername: theUsername,
    eyeShow: eyeShow,
    password: thePassword,
    countValueTime: countValueTime,
  };

  $: mainProps = {
    isShowUserCenter: isShowUserCenter,
    png64: png64,
    topContext: topContext,
    showStoredValueOrder: showStoredValueOrder,
    theOrderScroll: theOrderScroll,
    orderRefresh: orderRefresh,
    ourOrderList: ourOrderList,
    storedValueOrderList: storedValueOrderList,
    orderLoading: orderLoading,
    showQuestionnaireDoor: showQuestionnaireDoor,
    questionnaireInfo: questionnaireInfo,
    showQuestionnaire: showQuestionnaire,
    questionnaireInfoList: questionnaireInfoList,
    showInformation: showInformation,
    informationList: informationList,
    showInformationDetail: showInformationDetail,
    informationDetail: informationDetail,
    showGiftBag: showGiftBag,
    giftBagList: giftBagList,
    isLogin: isLogin,
    historyImgs: historyImgs,
    userLoginInfo: userLoginInfo,
    tabActive: tabActive,
    toDisableQuestionnaire: toDisableQuestionnaire,
    truncateAndMask: truncateAndMask,
    questionFlag: questionFlag,
  };
  $: registerProps = {
    isShowLoginRegister: isShowLoginRegister,
    png64: png64,
    showBack: showBack,
    theUsername: theUsername,
    eyeShow: eyeShow,
    password: thePassword,
    isShowLogin: isShowLogin,
    isShowRegister: isShowRegister,
    isUserChecked: isUserChecked,
    isShowLoginOther: isShowLoginOther,
    loginTypes: loginTypes,
    googleButton: googleButton,
  };
  $: dialogProps = {
    showUnbindFacebook: showUnbindFacebook,
    png64: png64,
    facebookUserInfo: facebookUserInfo,
    showGoogleBind: showGoogleBind,
    showUnbindGoogle: showUnbindGoogle,
    googleUserInfo: googleUserInfo,
    showGiftBagInfo: showGiftBagInfo,
    giftBagInfo: giftBagInfo,
  };
  // XZGG2从这开始写方法函数
  function myDebounce(f: any, t: number | undefined, im = false) {
    let timer: any;
    let flag = true;
    return (...args: any) => {
      // 需要立即执行的情况
      if (im) {
        if (flag) {
          f(...args);
          flag = false;
        } else {
          clearTimeout(timer);
          timer = setTimeout(() => {
            f(...args);
            flag = true;
            clearTimeout(timer as any);
          }, t);
        }
      } else {
        // 非立即执行的情况
        clearTimeout(timer);
        timer = setTimeout(() => {
          f(...args);
          clearTimeout(timer as any);
        }, t);
      }
    };
  }
  function closeUserCenter() {
    isShowUserCenter = false;
    showStoredValueOrder = false;
    showQuestionnaireDoor = false;
    showQuestionnaire = false;
    showInformation = false;
    showGiftBag = false;
    showTabBar = true;
  }
  function leftUserCenter() {
    if (showStoredValueOrder) {
      topContext = $t("sf_user_center");
      showStoredValueOrder = false;
    } else if (showQuestionnaireDoor) {
      topContext = $t("sf_user_center");
      showQuestionnaireDoor = false;
    } else if (showQuestionnaire) {
      topContext = $t("sf_user_center");
      showQuestionnaire = false;
    } else if (showInformation) {
      topContext = $t("sf_user_center");
      showInformation = false;
    } else if (showInformationDetail) {
      topContext = $t("sf_menu_news");
      showInformationDetail = false;
      showInformation = true;
    } else if (showGiftBag) {
      topContext = $t("sf_user_center");
      showGiftBag = false;
    } else {
      closeUserCenter();
    }
    showTabBar = true;
  }

  //   请求储值订单
  function requestStoredValueOrderList(fun_status?: number) {
    showLoader = true;
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/order/orderList",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      uid: userLoginInfo.uid,
      currentPage: orderCurrentPage,
      pageSize: orderPageSize,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (res) => {
        const storeList = [...storedValueOrderList];
        orderTotal = res.data.total;
        res.data.records.forEach((item: any) => {
          storeList.push(item);
          storedValueOrderList.push(item);
        });
        storedValueOrderList = storeList;
        showLoader = false;
        isShowOverlay = false;
        if (fun_status === 0) {
          topContext = $t("sf_user_recharge_order");
          ourOrderList = true;
          showStoredValueOrder = true;
        } else {
          ourOrderList = true;
          orderLoading = false;
          orderRefresh = false;
        }
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
  }
  const debounceRequestOrderList = myDebounce(
    requestStoredValueOrderList,
    500,
    false
  );
  function weOrderScroll() {
    var contentHeight = theOrderScroll.scrollHeight;
    var containerHeight = theOrderScroll.offsetHeight;
    var scrollDistance = theOrderScroll.scrollTop;
    if (scrollDistance < 0 && !orderRefresh) {
      orderRefresh = true;
      orderCurrentPage = 1;
      orderPageSize = 15;
      storedValueOrderList.splice(0);
      ourOrderList = false;
      debounceRequestOrderList(1);
    }
    // 上拉加载
    if (
      scrollDistance + containerHeight >= contentHeight - 1 &&
      !orderLoading
    ) {
      // 判断是否到达底部
      if (storedValueOrderList.length >= orderTotal) {
        orderLoading = false;
      } else {
        orderLoading = true;
        orderCurrentPage++;
        orderPageSize = 15;
        debounceRequestOrderList(1);
      }
    }
  }

  const showOtherAnswer = (item: any, qOption: any) => {
    return item.answerArray.some((arrItem: any) => qOption === arrItem);
  };
  // 请求问卷
  function requestQuestionnaire(fun_status?: number) {
    showLoader = true;
    const sofishWindowConfig = JSON.parse(
      localStorage.getItem("sofishWindowConfig") + ""
    );
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/server/questionnaire/getQuestionnaire",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      uid: userLoginInfo.uid,
      qid: sofishWindowConfig.questionId,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        if (
          !responseData.data.problemResultVOList ||
          responseData.data.problemResultVOList.length <= 0
        ) {
          showTooltip($t("sf_error_data_exception"));
          showLoader = false;
          return;
        }
        questionnaireInfo = responseData.data;
        let once_questionnaireInfoList = responseData.data.problemResultVOList;
        questionnaireInfoList = once_questionnaireInfoList?.map((item: any) => {
          return {
            ...item,
            answer: "" as any,
            answerArray: [] as any[],
            others: "",
          };
        });
        showLoader = false;
        if (fun_status === 0) {
          topContext = $t("sf_user_questionnaire");
          showQuestionnaireDoor = true;
        }
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
    //
    //
  }
  // 提交问卷
  function toSendQuestionnaire() {
    let returnFlag = false;
    const optionList = questionnaireInfoList.map((item) => {
      if (item.ptype === 0 && !item.answer && item.answerArray.length === 0) {
        returnFlag = true;
      }
      if (item.choice === 0) {
        const theOther = item.optionTableResultVOList.find(
          (elseItem: any) => elseItem.iselse === 1
        );
        return {
          pid: item.pid,
          qoption: item.answer,
          iselse: theOther?.qoption || "",
          memo: item.others,
        };
      } else if (item.choice === 1) {
        const theOther = item.optionTableResultVOList.find(
          (elseItem: any) => elseItem.iselse === 1
        );
        return {
          pid: item.pid,
          qoption: item.answerArray,
          iselse: theOther?.qoption || "",
          memo: item.others,
        };
      } else {
        return { pid: item.pid, qoption: "", iselse: "", memo: item.answer };
      }
    });
    if (returnFlag) {
      showTooltip($t("sf_question_check_undone"));
      return;
    }
    showLoader = true;
    //
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/server/questionnaire/answer",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      uid: userLoginInfo.uid,
      qid: questionnaireInfo.qid,
      qname: questionnaireInfo.qname,
      roleID: sdkRoleConfig.roleID,
      serverID: sdkRoleConfig.serverID,
      roleName: sdkRoleConfig.roleName,
      serverName: sdkRoleConfig.serverName,
      optionlist: JSON.stringify(optionList),
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        showLoader = false;
        showTooltip($t("other.submitted_successfully"));
        showTabBar = true;
        showQuestionnaire = false;
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
    //
  }
  // 请求资讯列表
  function requestSofishWindowNews(fun_status?: number) {
    showLoader = true;
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/gift/sofishwindowNews",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      uid: userLoginInfo.uid,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        informationList = responseData.data?.map((item: any) => {
          const newTime = new Date(
            Number(item.createTime)
          ).toLocaleDateString();
          return { ...item, newTime: newTime };
        });
        showLoader = false;
        if (fun_status === 0) {
          topContext = $t("sf_menu_news");
          showInformation = true;
        }
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
    //
  }
  // 请求获取礼包列表
  function requestGetListByUid(fun_status?: number) {
    showLoader = true;
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/gift/getListByUid",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      uid: userLoginInfo.uid,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        giftBagList = responseData.data;
        showLoader = false;
        if (fun_status === 0) {
          topContext = $t("sf_menu_pack");
          showGiftBag = true;
        }
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
    //
  }
  // 领取礼包
  function requestReceiveGift(event: CustomEvent) {
    const { giftId, index } = event.detail;
    showLoader = true;
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/gift/receiveGift",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      uid: userLoginInfo.uid,
      giftID: giftId,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        requestGetListByUid(1);
        showTooltip(responseData.msg);
        showLoader = false;
      },
      onCodeFail: (responseData: any) => {
        showLoader = false;
        loserReason(responseData);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
    //
  }
  // 获取FAQ信息列表
  function requestFAQ(fun_status?: number) {
    showLoader = true;
    const once_config: RequestConfigType = {
      ...often_config,
      method: "GET",
      apiUrl: "https://api-customer-h5.sogamecdn.com",
      truthUrl: "/ticket/v1/getPublicFaqConfig.api",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      uid: userLoginInfo.uid,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        customerServiceFaqList = responseData.data?.map((item: any) => {
          if (item.sub && item.sub?.length > 0) {
            item.sub.forEach((subItem: any, subIndex: number) => {
              item.sub[subIndex] = { isOpen: false, ...subItem };
              customerServiceFaqDesc.push(item.sub[subIndex]);
            });
          }
          item = { isOpen: false, ...item };
          return item;
        });
        showLoader = false;
        if (fun_status === 0) {
          isShowOverlay = true;
          isCustomerService = false;
          showCustomerServiceFAQ = true;
        }
      },
      onReadyStatus: (xhr) => {
        xhr.setRequestHeader("Accept-Language", appLang);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
  }
  // 获取支付阈值列表
  function requestPayListInfo(params?: any) {
    showLoader = true;
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/thirdorder/payProductInfo",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      uid: userLoginInfo.uid,
      channelID: platformTypeId,
      deviceID: uniqueString,
      roleID: params.roleID,
      roleName: params.roleName,
      serverID: params.serverID,
      serverName: params.serverName,
      productID: params.productID,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        showLoader = false;
        countryOptions = responseData.data;
        if (countryOptions) {
          countryOptions.forEach((item) => {
            item.label = $t(`other.${item.thirdCountry}`);
            if (item.regCountry == item.thirdCountry) {
              selectCountry = item;
              selectCountryThirdCountry = item.regCountry;
            }
          });
          isPayPopup = true;
          isShowOverlay = true;
        }
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
  }
  function postPayInfo() {
    showLoader = true;
    const newWindow = window.open(
      "https://cp-h5.pawpack.sofishgame.com/game/sdk/loading.html",
      "_blank"
    )!;
    const once_config: RequestConfigType = {
      ...often_config,
      truthUrl: "/thirdorder/create",
    };
    const once_query: RequestQueryType = {
      appID: appID,
      timestamp: nowTimeStamp(),
      uid: userLoginInfo.uid,
      channelID: platformTypeId,
      deviceID: uniqueString,
      roleID: thirdPayInfo.roleID,
      roleName: thirdPayInfo.roleName,
      serverID: thirdPayInfo.serverID,
      serverName: thirdPayInfo.serverName,
      vip: thirdPayInfo.vip,
      appLang: thirdPayInfo.appLang,
      price: thirdPayInfo.price,
      currency: thirdPayInfo.currency,
      thirdPrice: selectCountry.thirdPrice,
      thirdCurrency: selectCountry.thirdCurrency,
      payChannel: "",
      productID: thirdPayInfo.productID,
      productName: thirdPayInfo.productName,
      productDesc: thirdPayInfo.productDesc,
      cpOrderID: thirdPayInfo.cpOrderID,
      payNotifyUrl: thirdPayInfo.payNotifyUrl,
      extra: thirdPayInfo.extra,
    };
    const once_resHandler: ResponseHandlerType = {
      ...often_resHandler,
      onSuccess: (responseData) => {
        showLoader = false;
        if (responseData.data.code == "APPLY_SUCCESS") {
          newWindow.location.href = responseData.data.redirectUrl;
          thirdRedirectUrl = responseData.data.redirectUrl;
          const once_reUrl = encodeURIComponent(window.location.href);
          const thirdRedirectBtoa = window.btoa(once_reUrl);
          localStorage.setItem("thirdRedirectBlank", thirdRedirectBtoa);
          reporting("sdk_create_order", {
            price: thirdPayInfo.price,
            currency: selectCountry.thirdCurrency,
            quantity: 1,
            order_id: responseData.data.outTradeNo,
            product_id: thirdPayInfo.productID,
            receipt_id: thirdPayInfo.cpOrderID,
            role_id: thirdPayInfo.roleID,
            role_name: thirdPayInfo.roleName,
            server_id: thirdPayInfo.serverID,
            server_name: thirdPayInfo.serverName,
          });
          gtag_report_theConversion({
            send_to: "AW-16646656692/JbssCN7sksUZELSl34E-",
            value: thirdPayInfo.price,
          });
          fb_report_payment({
            eventName: "sdk_create_order",
            productID: thirdPayInfo.productID,
            currency: thirdPayInfo.currency,
            price: thirdPayInfo.price,
            cpOrderID: thirdPayInfo.cpOrderID,
          });
          isFunnyDialog = false;
          isPayPopup = false;
          isOrderCheckDialog = true;
        } else {
          newWindow.close();
          showTooltip($t("sf_create_order_failed"));
        }
      },
      onCodeFail: (responseData) => {
        showLoader = false;
        newWindow.close();
        loserReason(responseData);
      },
    };
    sdkRequest(once_config, once_query, once_resHandler);
  }
  // xzg
  function visitorToEmailLogin() {
    isVisitorLoginAccount = false;
    isShowOverlay = true;
    showLoginModalOther();
  }
  function gtag_report_theConversion(important: {
    send_to: string;
    value: number | string;
  }) {
    gtag_report_conversion(important);
  }
  // 打开储值订单
  const toStoredValueOrder = () => {
    storedValueOrderList.length = 0;
    orderTotal = 0;
    orderCurrentPage = 1;
    orderPageSize = 15;
    requestStoredValueOrderList(0);
  };
  //   打开问卷调查
  const toQuestionnaireDoor = () => {
    requestQuestionnaire(0);
  };
  const openQuestionnaire = () => {
    showQuestionnaireDoor = false;
    showQuestionnaire = true;
    showTabBar = false;
  };
  const toDisableQuestionnaire = (question: any, option: any) => {
    if (
      question.answerArray.length >= question.selectNum &&
      question.selectNum > 0
    ) {
      if (
        question.answerArray.some((arrItem: any) => option.qoption === arrItem)
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  //   打开资讯
  const toSofishWindowNews = () => {
    showStoredValueOrder = false;
    showQuestionnaireDoor = false;
    showQuestionnaire = false;
    showInformationDetail = false;
    showGiftBag = false;
    topContext = $t("sf_menu_news");
    showInformation = true;
    tabActive = 2;
    requestSofishWindowNews(0);
  };
  // 打开资讯详情
  const openInformationNews = (event: CustomEvent) => {
    const { item } = event.detail;
    informationDetail = item.content;
    showInformation = false;
    showInformationDetail = true;
  };
  // 打开礼包页面
  const toGiftBag = () => {
    showStoredValueOrder = false;
    showQuestionnaireDoor = false;
    showQuestionnaire = false;
    showInformation = false;
    showInformationDetail = false;
    showInformation = false;
    topContext = $t("sf_menu_pack");
    showGiftBag = true;
    tabActive = 3;
    requestGetListByUid(0);
  };
  //领取礼包
  const openGiftBag = myDebounce(requestReceiveGift, 500, false);
  //查看礼包
  const openGiftBagInfo = (event: CustomEvent) => {
    const { item } = event.detail;
    giftBagInfo = item;
    showGiftBagInfo = true;
    isShowOverlay = true;
  };

  // 关闭礼包
  const closeGiftBagInfo = () => {
    giftBagInfo = {};
    showGiftBagInfo = false;
    isShowOverlay = false;
  };
  //打开账户
  const toOpenAccount = () => {
    topContext = $t("sf_user_center");
    showStoredValueOrder = false;
    showQuestionnaireDoor = false;
    showQuestionnaire = false;
    showInformation = false;
    showInformationDetail = false;
    showInformation = false;
    showGiftBag = false;
    tabActive = 1;
  };
  // 打开底部栏客服中心
  const toCustomerService = () => {
    // tabActive = 4;
    customerService();
  };
  // 打开游戏注销协议
  const toShowLogoutAgreement = () => {
    showLogoutAgreement = true;
  };
  // 关闭游戏注销协议
  const closeLogoutAgreement = () => {
    showLogoutAgreement = false;
    logoutAgreementStatus = 0;
    logoutAgreementTitle = $t("sf_cancel_account_conditions_title");
    isLogoutAgreementCondition = false;
    isLogoutAgreementRead = false;
  };
  // 打开FAQ
  const openFAQ = () => {
    requestFAQ(0);
  };
  const closeFAQ = () => {
    showCustomerServiceFAQ = false;
    isShowOverlay = false;
  };
  // 打开facebook解绑
  const openUnbindFacebook = () => {
    if (isUserDetailBind(4)) {
      facebookUserInfo = userDetail?.find((item: any) => item.accountType == 4);
      isBindAccount = false;
      showUnbindFacebook = true;
    } else {
      userDetail = JSON.parse(localStorage.getItem(userDetailKey) + " ");
      facebookUserInfo = userDetail?.find((item: any) => item.accountType == 4);
      isBindAccount = false;
      showUnbindFacebook = true;
    }
  };
  // 离开facebook解绑
  const leftUnbindFacebook = () => {
    isBindAccount = true;
    showUnbindFacebook = false;
  };
  // 打开谷歌绑定与解绑
  function toBindGoogle(event: CustomEvent) {
    const { bindType } = event.detail;
    if (bindType === 1) {
      fire_google(1);
    } else {
      fire_google(2);
    }
  }

  // 关闭谷歌绑定
  const closeTheGoogleBind = () => {
    isBindAccount = true;
    showGoogleBind = false;
  };
  // 离开谷歌解绑
  const leftUnbindGoogle = () => {
    showUnbindGoogle = false;
    isBindAccount = true;
  };

  function toSelectOption(event: any) {
    if (countryOptions) {
      countryOptions.forEach((item) => {
        if (event.target.value == item.thirdCountry) {
          selectCountry = item;
        }
      });
    }
  }
  onMount(() => {
    // 存取设备ID
    var readUniqueString = getCookie(h5sdkimei); // 读取名为"h5sdkimei"的Cookie的值
    var flag = false;
    if (readUniqueString) {
      uniqueString = readUniqueString;
      setCookie(h5sdkimei, uniqueString, 7); // 存储名为"h5sdkimei"的Cookie，值为"uniqueString"，有效期7天
    } else {
      readUniqueString = getLocalStorage(h5sdkimei); // 读取LocalStorage中的值
      if (readUniqueString) {
        const readUniqueJson = JSON.parse(readUniqueString); // 如果存储的是JSON字符串，需要解析为对象
        if (readUniqueJson.h5sdkimei) {
          uniqueString = readUniqueJson.h5sdkimei;
          setCookie(h5sdkimei, uniqueString, 7); // 存储名为"h5sdkimei"的Cookie，值为"uniqueString"，有效期7天
        } else {
          flag = true;
        }
      } else {
        flag = true;
      }
    }

    //如果cookie 和 LocalStorage都没有取到设备 重新生成一个设备
    if (flag) {
      // 获取设备ID
      // fingerprintString = generateBrowserFingerprint();
      // uniqueString = md5(fingerprintString);
      uniqueString = generateUniqueStringWithTimestampAndUUID();
      setCookie(h5sdkimei, uniqueString, 7); // 存储名为"h5sdkimei"的Cookie，值为"uniqueString"，有效期7天
      setLocalStorage(h5sdkimei, JSON.stringify({ h5sdkimei: uniqueString })); // 存储一个对象到LocalStorage
    }
  });
  window.addEventListener("beforeinstallprompt", (e) => {
    const isIOSDevice = /(iPhone|iPad|iPod|ios)/i.test(navigator.userAgent);
    const isiPad = navigator.userAgent.match(/iPad/i) !== null;
    if (isIOSDevice) {
      havingShortcut = "ios";
    } else {
      e.preventDefault();
      deferredPrompt = e;
      havingShortcut = "android";
    }
  });
  window.addEventListener("appinstalled", () => {
    const isIOSDevice = /(iPhone|iPad|iPod|ios)/i.test(navigator.userAgent);
    if (isIOSDevice) {
      deferredPrompt = null;
    } else {
      deferredPrompt = null;
      havingShortcut = null;
    }
  });

  Sdk = {
    init: async function (
      fun_sdkInitConfig: any,
      callBack: {
        onLoginSuccess: Function;
        onClickFloatingButton?: Function;
        onLogOffSuccess?: Function;
      }
    ) {
      if (fun_sdkInitConfig?.appID) {
        sdkInitConfig = fun_sdkInitConfig;
      } else {
        let onceConfig = await decryptAES(
          fun_sdkInitConfig,
          "SOFISH1234567890SOFISH1234567890",
          "SOFISH1234567890"
        );
        sdkInitConfig = JSON.parse(onceConfig);
      }
      secretKey = sdkInitConfig.secretKey;
      appID = sdkInitConfig.appID;
      onLoginSuccess = callBack.onLoginSuccess;
      onLogOffSuccess = callBack.onLogOffSuccess;
      onClickFloatingButton = callBack.onClickFloatingButton;
      firebaseConfig = sdkInitConfig.firebaseConfig;

      ta_init(sdkInitConfig.thinkingConfig);
      reporting("sdk_init_start", "");
      reporting("sdk_h5_origin", {
        referrer: document.referrer,
        link: window.location.href,
      });
      const once_query = {
        appID: appID,
        timestamp: nowTimeStamp(),
        deviceID: uniqueString,
      };
      const signature = signParams(paramsSting(once_query), secretKey);
      const re_query = paramsSting(once_query) + "&sign=" + signature;
      const timezoneOffsetInHours = -(new Date().getTimezoneOffset() / 60);
      fetch(apiUrl + "/user/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          appVersion: sdkInitConfig.appVersion,
          sdkVersion: sdkInitConfig.sdkVersion,
          platformId: platformTypeId,
          appID: appID,
          deviceID: uniqueString,
          "Accept-Language": appLang,
          deviceTime: Date.now() + "",
          zoneOffset: timezoneOffsetInHours + "",
        },
        body: re_query,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error($t("sf_init_failed"));
          }
        })
        .then((responseData) => {
          if (responseData.code === 0) {
            setLocalStorage(initDataKey, JSON.stringify(responseData.data));
            initData = getLocalStorage(initDataKey);
            initData = JSON.parse(initData);
            reporting("sdk_init_success", { success: true });
          } else {
            reporting("sdk_init_failed", {
              success: true,
              http_code: responseData.code,
              http_message: responseData.msg,
            });
            loserReason(responseData, $t("sf_init_failed"));
          }
        })
        .catch((error) => {
          showTooltip(error.message);
        });

      // faceBook
      var fbWindow: any = window;
      fbWindow.fbAsyncInit = function () {
        FB.init({
          appId: sdkInitConfig.facebookClientId,
          xfbml: true,
          version: "v19.0",
        });
      };
      window.onload = function () {
        // firebase
        initializeApp(firebaseConfig);
        fireAuth = getAuth();
        fireProvider = new GoogleAuthProvider();
        const isIos = /iphone|ipad|ipod/.test(
          window.navigator.userAgent.toLowerCase()
        );
        const isInStandaloneMode =
          "standalone" in window.navigator && window.navigator.standalone;
        if (isIos) {
          if (isInStandaloneMode) {
            havingShortcut = null;
          } else {
            havingShortcut = "ios";
          }
        }

        // google
        // google.accounts.id.initialize({
        //   client_id: sdkInitConfig.googleClientId,
        //   callback: handleCredentialResponse,
        //   native_callback: (res: any) => {
        //     console.log(res);
        //   },
        //   use_fedcm_for_prompt: true,
        //   // login_uri: "https://test-gamedistribute-customer-h5.sofish.com/",
        // });
        // apple
        AppleID.auth.init({
          clientId: sdkInitConfig.iosClientId,
          scope: "name email",
          redirectURI: sdkInitConfig.redirectURI,
          usePopup: true,
        });
      };
    },
    submitGameData: function (params: any) {
      switch (Number(params.type)) {
        case 1:
          sdkRoleConfig = params;
          requestSofishWindowConfig();
          requestCheckUserIp();
          submitGameDataReporting(
            "sdk_role_create",
            {
              role_id: sdkRoleConfig.roleID,
              role_name: sdkRoleConfig.roleName,
              server_id: sdkRoleConfig.serverID,
              server_name: sdkRoleConfig.serverName,
            },
            1,
            sdkRoleConfig
          );
          break;
        case 2:
          sdkRoleConfig = params;
          requestSofishWindowConfig();
          requestCheckUserIp();
          submitGameDataReporting(
            "sdk_game_enter",
            {
              role_id: sdkRoleConfig.roleID,
              role_name: sdkRoleConfig.roleName,
              server_id: sdkRoleConfig.serverID,
              server_name: sdkRoleConfig.serverName,
            },
            2,
            sdkRoleConfig
          );
          break;
        case 3:
          submitGameDataReporting(
            "sdk_sdk_game_exit",
            {
              role_id: sdkRoleConfig.roleID,
              role_name: sdkRoleConfig.roleName,
              server_id: sdkRoleConfig.serverID,
              server_name: sdkRoleConfig.serverName,
            },
            3,
            sdkRoleConfig
          );
          break;
        case 4:
          submitGameDataReporting(
            "sdk_level_upgrade",
            {
              role_id: sdkRoleConfig.roleID,
              role_name: sdkRoleConfig.roleName,
              server_id: sdkRoleConfig.serverID,
              server_name: sdkRoleConfig.serverName,
              level: sdkRoleConfig?.roleLevel,
              score: sdkRoleConfig?.score,
            },
            4,
            sdkRoleConfig
          );
          break;
        default:
          break;
      }
      if (params.type === 1 || params.type === 2) {
        sdkRoleConfig = params;
        requestSofishWindowConfig();
        requestCheckUserIp();
      }
    },
    reportAnalysis: function (key: string, value: any) {
      if (!value) value = "";
      try {
        gtag_report(key, value);
        af_report(key, value);
        ta_report(key, value);
      } catch (error) {
        console.error(error);
      }
    },
    // !登录模组
    showLoginModal: function () {
      //判断是否初始化 没有进行初始化
      initData = getLocalStorage(initDataKey);
      if (initData === null) {
        showTooltip($t("sf_init_failed"));
        return;
      } else {
        initData = JSON.parse(initData);
      }
      if (initData.loginState === "0") {
        showTooltip($t("sf_error_login_closed"));
        return;
      }
      floatingButton.style.opacity = "1";
      if (initData.loginMode === "0") {
        if (!autoLoginReFlushToken()) {
          toPlatformLogin(1, uniqueString, null);
        }
      } else {
        //如果没有自动登录 弹登录框
        if (!autoLoginReFlushToken()) {
          isShowLoginRegister = true;
          isShowRegister = false;
          isShowLogin = true;
          showLoginOther();
          showBack = false;
          isShowOverlay = true;
        }
      }
    },
    onLogout: function () {
      showTooltip($t("other.logout_success"));
      isShowSwitchAccount = false;
      showHistoryAccountList = false;
      isSwitchAccount = false;
      isLogin = false;
      localStorage.removeItem(userLoginInfoKey);
      whetherLogin();
      reporting("sdk_logout", { success: true });
      FB.logout(function (response: any) {
        // user is now logged out
      });
    },
    toChangeLang: function (params: string) {
      if (params === "zh") {
        params = "zh-TW";
      }
      locale.set(params);
      appLang = params;
      sessionStorage.setItem("localeLanguage", params);
    },
    switchSofishButton: function (params: string) {
      if (floatingButton.style.opacity === "1") {
        floatingButton.style.opacity = "0";
      } else {
        floatingButton.style.opacity = "1";
      }
      isShowUserCenter = false;
      showStoredValueOrder = false;
      showQuestionnaireDoor = false;
      showQuestionnaire = false;
      showInformation = false;
      showGiftBag = false;
      showTabBar = true;
    },
    openThirdPay: function (characterInfo: CharacterInfoType) {
      let once_payData = JSON.parse(localStorage.getItem("payDataKey") + "");
      if (!userLoginInfo) {
        userLoginInfo = JSON.parse(
          localStorage.getItem("userLoginInfokey") + ""
        );
      }
      if (!once_payData?.thirdPayJumpLink || !userLoginInfo?.uid) {
        return showTooltip($t("sf_user_not_login"));
      }
      if (characterInfo instanceof Object) {
        const characterInfoNeedKeys = [
          "roleID",
          "roleName",
          "roleLevel",
          "serverID",
          "serverName",
          "vip",
          "appLang",
          "productID",
          "productName",
          "productDesc",
          "price",
          "cpOrderID",
          "payNotifyUrl",
          "extra",
          "currency",
        ];
        if (
          !characterInfoNeedKeys.every((key) =>
            Object.keys(characterInfo).includes(key)
          )
        ) {
          return showTooltip($t("sf_pay_checking"));
        }
      } else {
        return showTooltip($t("sf_pay_checking"));
      }
      if (once_payData?.thirdPaySwitch !== 1) {
        return showTooltip($t("sf_pay_closed"));
      }
      thirdPayInfo = characterInfo;
      const once_data = {
        ...characterInfo,
        appId: appID,
        uid: userLoginInfo?.uid,
        channelID: platformTypeId,
        deviceID: uniqueString,
      };
      const jsonData = JSON.stringify(once_data);
      // Base64加密
      const base64Data = Base64.encode(jsonData);
      const longUrl = once_payData.thirdPayJumpLink + base64Data + "";
      requestPayListInfo(characterInfo);
      // window.open(longUrl, "_blank");
    },
    addToDesktop: function (callBack?: {
      addIconSuccess?: Function;
      addIconFail?: Function;
    }) {
      if (deferredPrompt && havingShortcut !== "ios") {
        deferredPrompt.prompt();
      } else {
        if (typeof callBack?.addIconFail === "function") {
          callBack.addIconFail();
        }
        console.log(deferredPrompt, "fail");
        return;
      }
      // 等待用户的安装操作
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          if (typeof callBack?.addIconSuccess === "function") {
            callBack.addIconSuccess();
          }
          console.log("success");
        } else {
          if (typeof callBack?.addIconFail === "function") {
            callBack.addIconFail();
          }
          console.log("fail");
        }
        deferredPrompt = null;
        havingShortcut = null;
      });
    },
    reportPayment: function (params: any) {
      isOrderCheckDialog = false;
      isShowOverlay = false;
      try {
        gtag_report_theConversion({
          send_to: "AW-16646656692/jGaCCOHQmcUZELSl34E-",
          value: params.price,
        });
        fb_report_payment({
          eventName: "Purchase",
          productID: params.productID,
          currency: params.currency,
          price: params.price,
          cpOrderID: params.cpOrderID,
        });
        fb_report_payment({
          eventName: "sdk_purchase_success",
          productID: params.productID,
          currency: params.currency,
          price: params.price,
          cpOrderID: params.cpOrderID,
        });
      } catch (error) {
        console.error(error);
      }
    },
  };
</script>

<svelte:head>
  <meta
    name="viewport"
    content="width=device-width,user-scalable=no,initial-scale=1, minimum-scale=1,maximum-scale=1"
  />
  <script
    async
    defer
    crossorigin="anonymous"
    src="https://connect.facebook.net/en_US/sdk.js"
  ></script>
  <!-- <script async defer src="https://accounts.google.com/gsi/client"></script> -->
  <script
    type="text/javascript"
    src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
  ></script>

  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-2EJTZDWTVW"
  ></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-2EJTZDWTVW");
    gtag("config", "AW-16646656692");
  </script>

  <script>
    !(function (t, e, n, s, a, c, i, o, p) {
      (t.AppsFlyerSdkObject = a),
        (t.AF =
          t.AF ||
          function () {
            (t.AF.q = t.AF.q || []).push(
              [Date.now()].concat(Array.prototype.slice.call(arguments))
            );
          }),
        (t.AF.id = t.AF.id || i),
        (t.AF.plugins = {}),
        (o = e.createElement(n)),
        (p = e.getElementsByTagName(n)[0]),
        (o.async = 1),
        (o.src =
          "https://websdk.appsflyer.com?" +
          (c.length > 0 ? "st=" + c.split(",").sort().join(",") + "&" : "") +
          (i.length > 0 ? "af_id=" + i : "")),
        p.parentNode.insertBefore(o, p);
    })(window, document, "script", 0, "AF", "pba", {
      pba: {
        webAppId: "60ff327d-7b3d-495e-977d-4088bddd4a65",
        measurementStatus: true,
      },
    });
  </script>
  <!-- Meta Pixel Code -->
  <script>
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    fbq("init", "804674891820715");
    fbq("track", "PageView");
  </script>
  <noscript
    ><img
      height="1"
      width="1"
      style="display:none"
      src="https://www.facebook.com/tr?id=804674891820715&ev=PageView&noscript=1"
      alt=""
    /></noscript
  >
  <!-- End Meta Pixel Code -->
</svelte:head>

<!--悬浮按钮-->
<div
  bind:this={floatingButton}
  id="floatingButton"
  on:touchmove={floatingDragMove}
  on:touchstart={floatingDragStart}
  on:touchend={floatingDragEnd}
  on:mousedown={handleMouseDown}
  on:mousemove={handleMouseMove}
  on:mouseup={handleMouseUp}
  on:mouseleave={handleMouseUp}
  on:click={toggleUserCenter}
  role="button"
  on:keydown={() => {}}
  tabindex="0"
></div>

{#if isShowUserCenter}
  <MainPart
    bind:mainProps
    bind:theOrderScroll
    on:leftUserCenter={leftUserCenter}
    on:closeUserCenter={closeUserCenter}
    on:weOrderScroll={weOrderScroll}
    on:openQuestionnaire={openQuestionnaire}
    on:toSendQuestionnaire={toSendQuestionnaire}
    on:openInformationNews={openInformationNews}
    on:openGiftBagInfo={openGiftBagInfo}
    on:openGiftBag={openGiftBag}
    on:showSwitchAccount={showSwitchAccount}
    on:updateAccount={updateAccount}
    on:accountBind={accountBind}
    on:privacyPolicy={privacyPolicy}
    on:toStoredValueOrder={toStoredValueOrder}
    on:toLogOff={toLogOff}
    on:customerService={customerService}
    on:toQuestionnaireDoor={toQuestionnaireDoor}
    on:toOpenAccount={toOpenAccount}
    on:toSofishWindowNews={toSofishWindowNews}
    on:toGiftBag={toGiftBag}
    on:toCustomerService={toCustomerService}
    on:sdkShowLoginModal={Sdk.showLoginModal}
    on:eCopyToClipboard={eCopyToClipboard}
  >
    <div slot="question" class="the-questionnaire-main">
      <div class="the-questionnaire-list">
        {#each questionnaireInfoList as item, index}
          <!-- 单选 -->
          {#if item.choice === 0}
            <div class="the-questionnaire-item">
              <div class="the-questionnaire-item-title">
                {#if item.ptype === 0}
                  <span class="the-questionnaire-item-title-star">*</span>
                {:else}
                  <span class="the-questionnaire-item-title-star"> </span>
                {/if}
                <span>{index + 1}.</span>
                <span class="the-questionnaire-item-title-name"
                  >{item.pname}</span
                >
              </div>
              <div class="the-questionnaire-item-body">
                {#each item.optionTableResultVOList as option}
                  {#if option.iselse === 0}
                    <div class="the-questionnaire-item-option">
                      <label>
                        <div>
                          <input
                            type="radio"
                            bind:group={item.answer}
                            value={option.qoption}
                            class="the-questionnaire-item-option-key"
                          />
                          <span class="the-questionnaire-item-option-value"
                            >{option.content}</span
                          >
                        </div>
                      </label>
                    </div>
                  {:else}
                    <div class="the-questionnaire-item-other-option">
                      <label>
                        <div>
                          <input
                            type="radio"
                            bind:group={item.answer}
                            value={option.qoption}
                            class="the-questionnaire-item-option-key"
                          />
                          <span class="the-questionnaire-item-option-value"
                            >{option.content}</span
                          >
                          {#if item.answer === option.qoption}
                            <div class="the-questionnaire-item-option-others">
                              <input
                                type="text"
                                bind:value={item.others}
                                class="the-questionnaire-item-option-input"
                                autocapitalize="off"
                              />
                            </div>
                          {/if}
                        </div>
                      </label>
                    </div>
                  {/if}
                {/each}
              </div>
            </div>
          {:else if item.choice === 1}
            <div class="the-questionnaire-item">
              <div class="the-questionnaire-item-title">
                <span class="the-questionnaire-item-title-star">*</span>
                <span>{index + 1}.</span>
                <span class="the-questionnaire-item-title-name"
                  >{item.pname}</span
                >
              </div>
              <div class="the-questionnaire-item-body">
                {#each item.optionTableResultVOList as option}
                  {#if option.iselse === 0}
                    <div class="the-questionnaire-item-option">
                      <label>
                        <div>
                          <input
                            type="checkbox"
                            bind:group={item.answerArray}
                            value={option.qoption}
                            class="the-questionnaire-item-option-key"
                            disabled={toDisableQuestionnaire(item, option)}
                          />
                          <span class="the-questionnaire-item-option-value"
                            >{option.content}</span
                          >
                        </div>
                      </label>
                    </div>
                  {:else}
                    <div class="the-questionnaire-item-other-option">
                      <label>
                        <div>
                          <input
                            type="checkbox"
                            bind:group={item.answerArray}
                            value={option.qoption}
                            class="the-questionnaire-item-option-key"
                            disabled={toDisableQuestionnaire(item, option)}
                          />
                          <span class="the-questionnaire-item-option-value"
                            >{option.content}</span
                          >
                          <!-- 选中即显示 -->
                          {#if showOtherAnswer(item, option.qoption)}
                            <div class="the-questionnaire-item-option-others">
                              <input
                                type="text"
                                bind:value={item.others}
                                autocapitalize="off"
                                class="the-questionnaire-item-option-input"
                              />
                            </div>
                          {/if}
                        </div>
                      </label>
                    </div>
                  {/if}
                {/each}
              </div>
            </div>
            <!-- 填空 -->
          {:else if item.choice === 2}
            <div class="the-questionnaire-item">
              <div class="the-questionnaire-item-title">
                <span class="the-questionnaire-item-title-star">*</span>
                <span>{index + 1}.</span>
                <span class="the-questionnaire-item-title-name"
                  >{item.pname}</span
                >
              </div>
              <div class="the-questionnaire-item-body">
                <div class="the-questionnaire-item-other-option">
                  <label>
                    <div class="the-questionnaire-item-option-others">
                      <input
                        type="text"
                        bind:value={item.answer}
                        autocapitalize="off"
                        class="the-questionnaire-item-option-input"
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          {/if}
        {/each}
      </div>
      <div class="questionnaire-door-open">
        <button class="open-questionnaire-button" on:click={toSendQuestionnaire}
          >{$t("sf_question_action_submit")}</button
        >
      </div>
    </div>
  </MainPart>
{/if}

<!--加载动效-->
{#if showLoader}
  <div class="loader"></div>
  <div class="loader-overlay"></div>
{/if}
<!-- 遮罩层 -->
{#if isShowOverlay}
  <div id="overlay" class="overlay"></div>
{/if}
<!--提示框-->
{#if isShowTips}
  <div class="tooltip">
    {theText}
  </div>
{/if}

<!-- todo最开始登录成功的弹框 -->
{#if isSwitchAccount}
  <div class="switchaccount">
    <div class="switchaccount-left">
      <img
        class="switchaccount-avatar"
        src={historyImgs[Number(userLoginInfo.displayType)]}
        alt=""
      />
      <span class="text-span">{switchText}</span>
    </div>

    <a
      class="right-switch"
      on:click|preventDefault={showSwitchAccount}
      href="#top"
      style="display:inline-block;text-decoration: none;"
    >
      <img
        src={png64.login_switch}
        class="login-switch"
        alt="login switch account"
      />
      <span>{$t("sf_user_switch_account")}({tipTimeCount}s)</span>
    </a>
  </div>
{:else if isVisitorLoginAccount}
  <!-- 开始初始弹框 -->
  <div
    class="container-visitor-login"
    transition:fade={{ delay: 250, duration: 300 }}
  >
    <div class="image-container">
      <div class="welcome-you">
        {switchText}
      </div>
      <div
        class="close-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          isVisitorLoginAccount = false;
        }}
      >
        <img src={png64.close_image} class="close-image" alt="" />
      </div>
    </div>
    <div class="visitor-login-tips">
      {$t("sf_visitor_content")}
    </div>
    <div class="login-other-way">
      <div style="hepngt:32px;width:32px;margin:16px;cursor: pointer;">
        <div
          on:click={() => {
            fire_google(1, "start");
          }}
          role="button"
          on:keydown={() => {}}
          tabindex="0"
          style="height:32px;width:32px;background:url({png64.google_icon}) no-repeat center top / cover"
        ></div>
      </div>
      <div
        on:click={() => {
          toBindFacebook(1, "start");
        }}
        role="button"
        on:keydown={() => {}}
        tabindex="0"
      >
        <img src={png64.fb_icon} alt="" />
      </div>
      <div style="height:32px;width:32px;margin:16px;cursor: pointer;">
        <div
          on:click={() => {
            toBindIOS("start");
          }}
          role="button"
          on:keydown={() => {}}
          tabindex="0"
          style="height:32px;width:32px;background:url({png64.ios_icon}) no-repeat center top / cover"
        ></div>
      </div>
      <!-- <div
        on:click={() => {
          bindEmail();
        }}
        role="button"
        on:keydown={() => {}}
        tabindex="0"
      >
        <img src={png64.email_image2} alt="" />
      </div> -->
    </div>
  </div>
  <div class="overlay"></div>
{/if}

<!--!确认框，游戏注销第一步提示框-->
{#if isShowConfirm}
  <div
    class="confirm-modal"
    in:fade={{ delay: 250, duration: 300 }}
    out:fade={{ delay: 50, duration: 100 }}
  >
    <div class="modal-title">{title}</div>
    <div class="modal-content">
      <p style="font-size: 12px;margin-left: 5px;text-indent:24px;">
        {content}
      </p>
    </div>
    <div class="modal-buttons">
      <button on:click={handleCancel}>{cancelText}</button>
      <button on:click={handleConfirm}>{confirmText}</button>
    </div>
  </div>
{/if}

{#if isFunnyDialog}
  <div
    class="funny-dialog"
    in:fade={{ delay: 250, duration: 300 }}
    out:fade={{ delay: 50, duration: 100 }}
  >
    <div class="funny-dialog-content">
      <p>{$t("other.pay_dialog_text")}</p>
    </div>
    <div class="funny-dialog-buttons">
      <button
        on:click={() => {
          isFunnyDialog = false;
          isPayPopup = false;
          isShowOverlay = false;
        }}
        class="left-btn">{$t("other.pay_quit_text")}</button
      >
      <button
        on:click={() => {
          isFunnyDialog = false;
        }}
        class="right-btn">{$t("other.pay_continue_text")}</button
      >
    </div>
  </div>
{/if}
<!-- Popup content goes here -->

{#if isOrderCheckDialog}
  <div
    class="funny-dialog"
    in:fade={{ delay: 250, duration: 300 }}
    out:fade={{ delay: 50, duration: 100 }}
  >
    <div class="funny-dialog-content">
      <p>{$t("sf_owned_order_check")}</p>
    </div>
    <div class="funny-dialog-buttons">
      <button
        on:click={() => {
          isOrderCheckDialog = false;
          isShowOverlay = false;
        }}
        class="left-btn">{$t("other.pay_quit_text")}</button
      >
      <button
        on:click={() => {
          if (thirdRedirectUrl) {
            window.open(thirdRedirectUrl, "_blank");
          } else {
            showTooltip($t("sf_owned_order_checked_failed"));
            isOrderCheckDialog = false;
            isShowOverlay = false;
          }
        }}
        class="right-btn">{$t("other.pay_continue_text")}</button
      >
    </div>
  </div>
{/if}

{#if isPayPopup}
  <div
    class="pay-popup"
    transition:fly={{ y: 100, duration: 300, easing: cubicOut }}
  >
    <div class="pay-popup-header">
      <span>{$t("other.select_country_list")}</span>
      <div
        class="close-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          isFunnyDialog = true;
        }}
      >
        <img src={png64.close_image} class="close-image" alt="X" />
      </div>
    </div>
    <div class="pay-popup-content">
      <div class="select-notice">
        <img src={png64.notice_icon} class="notice-icon" alt="X" />
        {$t("other.select_country")}
      </div>
      <div class="select-container">
        <select
          bind:value={selectCountryThirdCountry}
          on:change={toSelectOption}
        >
          {#each countryOptions as option}
            <option value={option.thirdCountry}>{option.label}</option>
          {/each}
        </select>
        <img class="dropdown-icon" src={png64.pull_down} alt="v" />
      </div>
      <p class="show-money">
        {$t("other.showMoney")}:
        <span class="pay-amount"
          >{selectCountry.thirdSymbol} {selectCountry.thirdPrice}</span
        >
      </p>
      <div>
        <button
          class="submit-payInfo"
          on:click={() => {
            postPayInfo();
          }}>{$t("other.submit_pay")}</button
        >
      </div>
    </div>
  </div>
{/if}

<!-- todo facebook解绑 -->
{#if showUnbindFacebook}
  <DialogPart
    bind:dialogProps
    on:leftUnbindFacebook={leftUnbindFacebook}
    on:whereBindFacebook={whereBindFacebook}
    on:closeTheGoogleBind={closeTheGoogleBind}
    on:leftUnbindGoogle={leftUnbindGoogle}
    on:closeGiftBagInfo={closeGiftBagInfo}
    on:eCopyToClipboard={eCopyToClipboard}
  >
    <div
      slot="bindGoogle"
      id="google-bind-button"
      bind:this={theGoogleBind}
    ></div>
    <div
      slot="unbindGoogle"
      id="google-bind-button"
      bind:this={theGoogleUnbind}
    ></div>
  </DialogPart>
{/if}
<!--  todo 谷歌绑定-->
{#if showGoogleBind}
  <DialogPart
    bind:dialogProps
    on:leftUnbindFacebook={leftUnbindFacebook}
    on:whereBindFacebook={whereBindFacebook}
    on:closeTheGoogleBind={closeTheGoogleBind}
    on:leftUnbindGoogle={leftUnbindGoogle}
    on:closeGiftBagInfo={closeGiftBagInfo}
    on:eCopyToClipboard={eCopyToClipboard}
  >
    <div
      slot="bindGoogle"
      id="google-bind-button"
      bind:this={theGoogleBind}
    ></div>
    <div
      slot="unbindGoogle"
      id="google-bind-button"
      bind:this={theGoogleUnbind}
    ></div>
  </DialogPart>
{/if}

<!-- todo 谷歌解绑 -->
{#if showUnbindGoogle}
  <DialogPart
    bind:dialogProps
    on:leftUnbindFacebook={leftUnbindFacebook}
    on:whereBindFacebook={whereBindFacebook}
    on:closeTheGoogleBind={closeTheGoogleBind}
    on:leftUnbindGoogle={leftUnbindGoogle}
    on:closeGiftBagInfo={closeGiftBagInfo}
    on:eCopyToClipboard={eCopyToClipboard}
  >
    <div
      slot="bindGoogle"
      id="google-bind-button"
      bind:this={theGoogleBind}
    ></div>
    <div
      slot="unbindGoogle"
      id="google-bind-button"
      bind:this={theGoogleUnbind}
    ></div>
  </DialogPart>
{/if}
<!--  todo 查看礼包信息-->
{#if showGiftBagInfo}
  <DialogPart
    bind:dialogProps
    on:leftUnbindFacebook={leftUnbindFacebook}
    on:whereBindFacebook={whereBindFacebook}
    on:closeTheGoogleBind={closeTheGoogleBind}
    on:leftUnbindGoogle={leftUnbindGoogle}
    on:closeGiftBagInfo={closeGiftBagInfo}
    on:eCopyToClipboard={eCopyToClipboard}
  >
    <div
      slot="bindGoogle"
      id="google-bind-button"
      bind:this={theGoogleBind}
    ></div>
    <div
      slot="unbindGoogle"
      id="google-bind-button"
      bind:this={theGoogleUnbind}
    ></div>
  </DialogPart>
{/if}

{#if isShowLoginRegister}
  <RegisterPart
    bind:registerProps
    bind:theUsername
    bind:password={thePassword}
    bind:isUserChecked
    on:showSwitchAccount={showSwitchAccount}
    on:closeLoginModal={closeLoginModal}
    on:handleEyeShow={handleEyeShow}
    on:forgotPassword={forgotPassword}
    on:showRegister={showRegister}
    on:toLogin={toLogin}
    on:toRegister={toRegister}
    on:handleCheckboxChange={handleCheckboxChange}
    on:openPrivacyPolicyUer={openPrivacyPolicyUer}
    on:openPrivacyPolicy={openPrivacyPolicy}
    on:FBLogin={FBLogin}
    on:whereVisitorLogin={whereVisitorLogin}
  >
    <!-- <div slot="google" style="position: relative; height:30px ;width:30px">
      <div
        id="google-login-button"
        bind:this={googleButton}
        style="position: absolute;"
      ></div>
    </div> -->
    <div
      slot="google"
      style="height:32px;width:32px;margin:16px;cursor: pointer;"
    >
      <div
        on:click={() => {
          fire_google(0);
        }}
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        style="height:32px;width:32px;background:url({png64.google_icon}) no-repeat center top / cover"
      ></div>
    </div>
    <div slot="ios" style="height:32px;width:32px;margin:16px;cursor: pointer;">
      <div
        on:click={toLoginIOS}
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        style="height:32px;width:32px;background:url({png64.ios_icon}) no-repeat center top / cover"
      ></div>
    </div>
  </RegisterPart>
{/if}
{#if isShowSwitchAccount}
  <AccountPart
    bind:accountProps
    bind:theUsername
    bind:password={thePassword}
    on:closeSwitchModal={closeSwitchModal}
    on:selectHistoryUserInfo={selectHistoryUserInfo}
    on:toSwitchLogin={toSwitchLogin}
    on:showLoginModalOther={showLoginModalOther}
    on:confirmOff={confirmOff}
    on:closeUpdateAccounted={closeUpdateAccounted}
    on:copyAccount={copyAccount}
    on:closeUpdateAccount={closeUpdateAccount}
    on:handleEyeShow={handleEyeShow}
    on:confirmUpdateAccount={confirmUpdateAccount}
    on:showSwitchAccountList={showSwitchAccountList}
  ></AccountPart>
{/if}

{#if isShowEmailTips}
  <AccountPart
    bind:accountProps
    bind:theUsername
    bind:password={thePassword}
    on:closeSwitchModal={closeSwitchModal}
    on:selectHistoryUserInfo={selectHistoryUserInfo}
    on:toSwitchLogin={toSwitchLogin}
    on:showLoginModalOther={showLoginModalOther}
    on:confirmOff={confirmOff}
    on:closeUpdateAccounted={closeUpdateAccounted}
    on:copyAccount={copyAccount}
    on:closeUpdateAccount={closeUpdateAccount}
    on:handleEyeShow={handleEyeShow}
    on:confirmUpdateAccount={confirmUpdateAccount}
  ></AccountPart>
{/if}
{#if isShowUpdateAccounted}
  <AccountPart
    bind:accountProps
    bind:theUsername
    bind:password={thePassword}
    on:closeSwitchModal={closeSwitchModal}
    on:selectHistoryUserInfo={selectHistoryUserInfo}
    on:toSwitchLogin={toSwitchLogin}
    on:showLoginModalOther={showLoginModalOther}
    on:confirmOff={confirmOff}
    on:closeUpdateAccounted={closeUpdateAccounted}
    on:copyAccount={copyAccount}
    on:closeUpdateAccount={closeUpdateAccount}
    on:handleEyeShow={handleEyeShow}
    on:confirmUpdateAccount={confirmUpdateAccount}
  ></AccountPart>
{/if}
{#if isShowUpdateAccount}
  <AccountPart
    bind:accountProps
    bind:theUsername
    bind:password={thePassword}
    on:closeSwitchModal={closeSwitchModal}
    on:selectHistoryUserInfo={selectHistoryUserInfo}
    on:toSwitchLogin={toSwitchLogin}
    on:showLoginModalOther={showLoginModalOther}
    on:confirmOff={confirmOff}
    on:closeUpdateAccounted={closeUpdateAccounted}
    on:copyAccount={copyAccount}
    on:closeUpdateAccount={closeUpdateAccount}
    on:handleEyeShow={handleEyeShow}
    on:confirmUpdateAccount={confirmUpdateAccount}
  ></AccountPart>
{/if}

{#if isShowEmail}
  <BindPart
    bind:bindProps
    bind:email={theEmail}
    bind:emailOtp
    bind:isLogOffChecked
    on:toCloseBindEmailAccounted={toCloseBindEmailAccounted}
    on:closeEmail={closeEmail}
    on:notDebounceSendEmail={notDebounceSendEmail}
    on:submitLogOff={submitLogOff}
    on:submitEmailBind={submitEmailBind}
    on:logOffCheckboxChange={logOffCheckboxChange}
    on:toShowLogoutAgreement={toShowLogoutAgreement}
    on:closeBindAccount={closeBindAccount}
    on:closeBindAccounted={closeBindAccounted}
    on:deleteEmailBindAccount={deleteEmailBindAccount}
    on:deleteBindAccount={deleteBindAccount}
    on:whereBindFacebook={whereBindFacebook}
    on:toBindGoogle={toBindGoogle}
    on:toUnBindIOS={toUnBindIOS}
    on:toBindIOS={whereBindIOS}
    on:openUnbindFacebook={openUnbindFacebook}
    on:bindEmail={bindEmail}
  ></BindPart>
{/if}
{#if isShowBindAccounted}
  <BindPart
    bind:bindProps
    bind:email={theEmail}
    bind:emailOtp
    bind:isLogOffChecked
    on:toCloseBindEmailAccounted={toCloseBindEmailAccounted}
    on:closeEmail={closeEmail}
    on:notDebounceSendEmail={notDebounceSendEmail}
    on:submitLogOff={submitLogOff}
    on:submitEmailBind={submitEmailBind}
    on:logOffCheckboxChange={logOffCheckboxChange}
    on:toShowLogoutAgreement={toShowLogoutAgreement}
    on:closeBindAccount={closeBindAccount}
    on:closeBindAccounted={closeBindAccounted}
    on:deleteEmailBindAccount={deleteEmailBindAccount}
    on:deleteBindAccount={deleteBindAccount}
    on:whereBindFacebook={whereBindFacebook}
    on:toBindGoogle={toBindGoogle}
    on:toUnBindIOS={toUnBindIOS}
    on:toBindIOS={whereBindIOS}
    on:openUnbindFacebook={openUnbindFacebook}
    on:bindEmail={bindEmail}
  ></BindPart>
{/if}
{#if isBindAccount}
  <BindPart
    bind:bindProps
    bind:email={theEmail}
    bind:emailOtp
    bind:isLogOffChecked
    on:toCloseBindEmailAccounted={toCloseBindEmailAccounted}
    on:closeEmail={closeEmail}
    on:notDebounceSendEmail={notDebounceSendEmail}
    on:submitLogOff={submitLogOff}
    on:submitEmailBind={submitEmailBind}
    on:logOffCheckboxChange={logOffCheckboxChange}
    on:toShowLogoutAgreement={toShowLogoutAgreement}
    on:closeBindAccount={closeBindAccount}
    on:closeBindAccounted={closeBindAccounted}
    on:deleteEmailBindAccount={deleteEmailBindAccount}
    on:deleteBindAccount={deleteBindAccount}
    on:whereBindFacebook={whereBindFacebook}
    on:toBindGoogle={toBindGoogle}
    on:toUnBindIOS={toUnBindIOS}
    on:toBindIOS={whereBindIOS}
    on:openUnbindFacebook={openUnbindFacebook}
    on:bindEmail={bindEmail}
  ></BindPart>
{/if}

{#if isShowGetPassWord}
  <PasswordPart
    bind:passwordProps
    bind:passUserName
    bind:passEmail
    bind:passEmailOtp
    bind:passwordReset
    bind:userNameEmail
    bind:userNameDataUsername
    on:closeGetPassWord={closeGetPassWord}
    on:submitNext={submitNext}
    on:getUserName={getUserName}
    on:contactCustomer={contactCustomer}
    on:closePasswordResetWord={closePasswordResetWord}
    on:notDebounceSendEmail={notDebounceSendEmail}
    on:handleEyeShow={handleEyeShow}
    on:submitRest={submitRest}
    on:closeGetUserName={closeGetUserName}
    on:closeUserName={closeUserName}
    on:copyAndLogin={copyAndLogin}
    on:submitUserNameNext={submitUserNameNext}
  ></PasswordPart>
{/if}
{#if isShowResetPassWord}
  <PasswordPart
    bind:passwordProps
    bind:passUserName
    bind:passEmail
    bind:passEmailOtp
    bind:passwordReset
    bind:userNameEmail
    bind:userNameDataUsername
    on:closeGetPassWord={closeGetPassWord}
    on:submitNext={submitNext}
    on:getUserName={getUserName}
    on:contactCustomer={contactCustomer}
    on:closePasswordResetWord={closePasswordResetWord}
    on:notDebounceSendEmail={notDebounceSendEmail}
    on:handleEyeShow={handleEyeShow}
    on:submitRest={submitRest}
    on:contactCustomer={contactCustomer}
    on:closeGetUserName={closeGetUserName}
    on:closeUserName={closeUserName}
    on:copyAndLogin={copyAndLogin}
    on:contactCustomer={contactCustomer}
    on:submitUserNameNext={submitUserNameNext}
  ></PasswordPart>
{/if}
{#if isShowGetUserName}
  <PasswordPart
    bind:passwordProps
    bind:passUserName
    bind:passEmail
    bind:passEmailOtp
    bind:passwordReset
    bind:userNameEmail
    bind:userNameDataUsername
    on:closeGetPassWord={closeGetPassWord}
    on:submitNext={submitNext}
    on:getUserName={getUserName}
    on:contactCustomer={contactCustomer}
    on:closePasswordResetWord={closePasswordResetWord}
    on:notDebounceSendEmail={notDebounceSendEmail}
    on:handleEyeShow={handleEyeShow}
    on:submitRest={submitRest}
    on:contactCustomer={contactCustomer}
    on:closeGetUserName={closeGetUserName}
    on:closeUserName={closeUserName}
    on:copyAndLogin={copyAndLogin}
    on:contactCustomer={contactCustomer}
    on:submitUserNameNext={submitUserNameNext}
  ></PasswordPart>
{/if}
{#if isShowUserName}
  <PasswordPart
    bind:passwordProps
    bind:passUserName
    bind:passEmail
    bind:passEmailOtp
    bind:passwordReset
    bind:userNameEmail
    bind:userNameDataUsername
    on:closeGetPassWord={closeGetPassWord}
    on:submitNext={submitNext}
    on:getUserName={getUserName}
    on:contactCustomer={contactCustomer}
    on:closePasswordResetWord={closePasswordResetWord}
    on:notDebounceSendEmail
    on:handleEyeShow={handleEyeShow}
    on:submitRest={submitRest}
    on:contactCustomer={contactCustomer}
    on:closeGetUserName={closeGetUserName}
    on:closeUserName={closeUserName}
    on:copyAndLogin={copyAndLogin}
    on:contactCustomer={contactCustomer}
    on:submitUserNameNext={submitUserNameNext}
  ></PasswordPart>
{/if}

<!-- todo 隐私协议 -->
{#if isPrivacyPolicy}
  <AgreementPart
    bind:agreementProps
    bind:isLogoutAgreementCondition
    bind:isLogoutAgreementRead
    on:closePrivacyPolicy={closePrivacyPolicy}
    on:openPrivacyPolicy={openPrivacyPolicy}
    on:openPrivacyPolicyUer={openPrivacyPolicyUer}
    on:closeLogoutAgreement={closeLogoutAgreement}
  ></AgreementPart>
{/if}
<!--  todo 游戏账号注销协议-->
{#if showLogoutAgreement}
  <AgreementPart
    bind:agreementProps
    bind:isLogoutAgreementCondition
    bind:isLogoutAgreementRead
    on:closePrivacyPolicy={closePrivacyPolicy}
    on:openPrivacyPolicy={openPrivacyPolicy}
    on:openPrivacyPolicyUer={openPrivacyPolicyUer}
    on:closeLogoutAgreement={closeLogoutAgreement}
  ></AgreementPart>
{/if}
<!-- todo 客服中心服务-->
{#if isCustomerService}
  <CustomerPart
    bind:customerProps
    on:openCommunity={openCommunity}
    on:openFAQ={openFAQ}
    on:closeFAQ={closeFAQ}
    on:contactCustomer={contactCustomer}
    on:closeCustomerService={closeCustomerService}
  ></CustomerPart>
{/if}

{#if showCustomerServiceFAQ}
  <CustomerPart
    bind:customerProps
    on:openCommunity={openCommunity}
    on:openFAQ={openFAQ}
    on:closeFAQ={closeFAQ}
    on:contactCustomer={contactCustomer}
    on:closeCustomerService={closeCustomerService}
  ></CustomerPart>
{/if}

<style lang="less">
  @import "./css/main.less";
</style>
