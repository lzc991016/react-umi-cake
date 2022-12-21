import { request } from 'umi';

export const cateAdd = (cateObj) => {
  //新增分类
  return request('/classes/CakeCate', {
    method: 'POST',
    data: cateObj,
  });
};
export const cateGet = () => {
  //分类列表
  return request('/classes/CakeCate', {
    method: 'GET',
  });
};

export const cateEdit = (objectId, cateObj) => {
  //更新分类列表
  return request(`/classes/CakeCate/${objectId}`, {
    method: 'PUT',
    data: cateObj,
  });
};

export const cateDelete = (objectId) => {
  //删除分类列表
  return request(`/classes/CakeCate/${objectId}`, {
    method: 'DELETE',
  });
};

export const bannerAdd = (bannerObj) => {
  //新增轮播
  return request('/classes/CakeBanner', {
    method: 'POST',
    data: bannerObj,
  });
};

export const bannerGet = () => {
  //加载轮播列表
  return request('/classes/CakeBanner', {
    method: 'GET',
  });
};

export const bannerUpdate = (objectId, bannerObj) => {
  //更新轮播
  return request(`/classes/CakeBanner/${objectId}`, {
    method: 'PUT',
    data: bannerObj,
  });
};

export const bannerDelete = (objectId) => {
  //删除轮播
  return request(`/classes/CakeBanner/${objectId}`, {
    method: 'DELETE',
  });
};

export const goodsAdd = (cakeObj) => {
  //新增商品
  return request('/classes/CakeGoods', {
    method: 'POST',
    data: cakeObj,
  });
};

export const goodsGet = (params = {}) => {
  //商品列表
  delete params.current;
  delete params.pageSize;
  let condition = JSON.stringify(params);
  return request(`/classes/CakeGoods?where=${condition}`, {
    method: 'GET',
  });
};

export const goodsExchange = (cakelist, values) => {
  //商品自动转存
  let batchObj = { requests: [] };
  cakelist.forEach((item) => {
    item.sname = item.sname ? item.sname : '';
    item.sid = item.sid ? item.sid : 20222106;
    batchObj.requests.push({
      method: 'POST',
      path: '/1.1/classes/CakeGoods',
      body: { ...item, ...values },
    });
  });
  return request('/batch', {
    method: 'POST',
    data: batchObj,
  });
};

export const areaAdd = (areaObj) => {
  //录入配送范围
  return request('/classes/CakeArea', {
    method: 'POST',
    data: areaObj,
  });
};

export const areaGet = (city) => {
  //加载配送范围
  return request(`/classes/CakeArea?where={"city":"${city}"}`, {
    method: 'GET',
  });
};

export const areaUpdate = (objectId, areaObj) => {
  //更新配送范围
  return request(`/classes/CakeArea/${objectId}`, {
    method: 'PUT',
    data: areaObj,
  });
};

export const pieOptionGet = () => {
  //加载配送范围
  return request(`/classes/CakeChart`, {
    method: 'GET',
  });
};
