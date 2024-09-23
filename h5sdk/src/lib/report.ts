import thinkingdata from "thinkingdata-browser";
// import bizSdk from "facebook-nodejs-business-sdk";
export const thinkingConfig = {
  appId: "370f1ecfb7684b58bce902518c32946a",
  serverUrl: "https://api-shushu.sogamecdn.com",
  showLog: false,
  autoTrack: {
    pageShow: false, //开启页面展示事件，事件名ta_page_show
    pageHide: false, //开启页面隐藏事件，事件名ta_page_hide
  },
};

export function ta_init(params: any = thinkingConfig) {
  window.ta = thinkingdata;
  window.ta.init(params);
}

export function gtag_report(_name: string, important?: any) {
  try {
    gtag("event", _name, important);
  } catch (error) {
    console.log(error);
  }
}
export function gtag_report_conversion(
  important: { send_to: string; value: number | string },
  url?: any
) {
  var callback = function () {
    if (typeof url != "undefined") {
      window.location = url;
    }
  };
  gtag("event", "conversion", {
    send_to: important.send_to,
    value: important.value,
    currency: "USD",
    event_callback: callback,
  });
  return false;
}
export function af_report(_eventName: string, _eventValue: any) {
  try {
    AF("pba", "event", {
      eventType: "EVENT",
      eventName: _eventName,
      eventValue: _eventValue,
    });
  } catch (error) {
    console.log(error);
  }
}

export function ta_report(_eventName: string, _eventValue: any) {
  try {
    ta.track(_eventName, _eventValue);
  } catch (error) {
    console.log(error);
  }
}
export function ta_login(_eventName: string) {
  try {
    ta.login(_eventName);
  } catch (error) {
    console.log(error);
  }
}
export function ta_userSet(_eventName: string) {
  try {
    ta.userSet({ register_platform: _eventName });
  } catch (error) {
    console.log(error);
  }
}

export function af_login(_eventValue: string) {
  try {
    AF("pba", "setCustomerUserId", _eventValue);
  } catch (error) {
    console.log(error);
  }
}

// 获取特定 Cookie
export function getCookie(name: string) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=").map((c) => c.trim());
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return "";
}

export function fb_report_payment(
  params: {
    eventName: string;
    productID?: string;
    currency?: string;
    price?: string;
    cpOrderID?: string;
  },
  _type?: number
) {
  // 获取所有 Cookie
  let allCookies = document.cookie;
  let fbcCookieValue = getCookie("_fbc");
  let fbpCookieValue = getCookie("_fbp");
  const access_token =
    "EAAQekaZACqE4BO0wZBbRTbFqAdnoS49oq7lHUhJpIbscd8j7yNfz6QViZAafqZAcDA4q8h89ZAOT7bT6YHxoOvShJczlzK15prmqZA15lt3GUJv8339r7F0c7AZAOISCDD8tvJGPijYdado83GzGz7KgZCipr1ceW5mOZAYZAL5wWAWdBxzsZC9yAdKZAHEAYqnpA6VQFgZDZD";
  const pixel_id = "804674891820715";
  let data = {};
  if (_type === 1) {
    data = [
      {
        event_name: params.eventName,
        event_time: Math.floor(new Date().getTime() / 1000),
        user_data: {
          client_user_agent: navigator.userAgent,
          fbc: fbcCookieValue,
          fbp: fbpCookieValue,
        },
        event_source_url: window.location.href,
        action_source: "website",
      },
    ];
  } else {
    data = [
      {
        event_name: params.eventName,
        event_time: Math.floor(new Date().getTime() / 1000),
        user_data: {
          client_user_agent: navigator.userAgent,
          fbc: fbcCookieValue,
          fbp: fbpCookieValue,
        },
        custom_data: {
          currency: params.currency,
          value: params.price,
          order_id: params.cpOrderID,
          contents: [
            {
              id: params.productID,
              quantity: 1,
              delivery_category: "home_delivery",
            },
          ],
        },
        event_source_url: window.location.href,
        action_source: "website",
      },
    ];
  }

  fetch(
    `https://graph.facebook.com/v20.0/${pixel_id}/events?access_token=${access_token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: access_token,
      },
      body: JSON.stringify({ data }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
