/* eslint-disable import/prefer-default-export */

export function preLoad(list: string[]) {
  if (typeof window !== 'undefined') {
    // 图处预加载；
    const div = document.createElement('div');
    div.style.display = 'none';
    document.body.appendChild(div);
    list.forEach(src => {
      const img = new Image();
      img.src = src;
      div.appendChild(img);
    });
  }
}

let siteData: any = null;
let siteDataPromise: Promise<any> = null!;
export function getSiteData(keys: Array<string | number> = []): any {
  if (!siteDataPromise) {
    siteDataPromise = fetch('http://my-json-server.typicode.com/ant-design/website-data/db')
      .then(res => res.json())
      .then((data: any) => {
        siteData = data;
      });
  }

  if (!siteData) {
    throw siteDataPromise;
  }

  return keys.reduce((data, key) => {
    return data[key];
  }, siteData);
}
