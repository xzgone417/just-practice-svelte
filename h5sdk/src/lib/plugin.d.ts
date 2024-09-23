declare module "blueimp-md5";
declare module "crypto-js";
declare var google;
declare var AppleID;
declare var FB;
declare module "facebook-nodejs-business-sdk";
type CharacterInfoType = {
  roleID: string; //角色ID
  roleName: string; //角色名称
  roleLevel: string; //角色等级
  serverID: string; //服务器ID
  serverName: string; //服务器名称
  vip: string; //vip等级
  appLang: string; //语言编码，第三方支付页面语言(如：ru-RU)
  productID: string; //游戏内的商品ID
  productName: string; //游戏商品商品名称，比如100元宝，500钻石...
  productDesc: string; //商品描述，比如 充值100元宝，赠送20元宝
  price: string; //商品金额(单位：分)
  cpOrderID: string; //游戏自己的订单号
  payNotifyUrl: string; //游戏服务器的支付通知回调地址
  extra: string; //游戏自定义参数(支付回调通知给游戏服务器发货时原样返回)，默认传1
};
