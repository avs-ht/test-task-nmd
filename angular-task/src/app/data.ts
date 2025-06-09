export interface Route {
  uuid: string;
  address: string;
  mask: string;
  gateway: string;
  interface: string;
}

const getIpAsNumber = (ip: string) => {
  try {
    const [a, b, c, d] = ip.split('.');
    return (
      Number(a) * 256 ** 3 + Number(b) * 256 ** 2 + Number(c) * 256 + Number(d)
    );
  } catch (e) {
    return 0;
  }
};

const ipSortFn = (ip1: string, ip2: string) => {
  const ip1AsNumber = getIpAsNumber(ip1);
  const ip2AsNumber = getIpAsNumber(ip2);
  return ip1AsNumber - ip2AsNumber;
};

interface Header {
  name: keyof Route;
  title: string;
  sortFn: (a: string, b: string) => number;
}

export const HEADERS: Header[] = [
  {
    name: 'address',
    title: 'Адрес назначения',
    sortFn: ipSortFn,
  },
  {
    name: 'gateway',
    title: 'Шлюз',
    sortFn: ipSortFn,
  },
  {
    name: 'interface',
    title: 'Интерфейс',
    sortFn: (a: string, b: string) => a.localeCompare(b),
  },
];

export const ROUTES: Route[] = [
  {
    uuid: '1',
    address: '0.0.0.0',
    mask: '0',
    gateway: '193.0.174.1',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: '2',
    address: '10.1.30.0',
    mask: '24',
    gateway: '0.0.0.0',
    interface: 'Гостевая сеть',
  },
  {
    uuid: '3',
    address: '192.168.1.0',
    mask: '24',
    gateway: '0.0.0.0',
    interface: 'Домашняя сеть',
  },
  {
    uuid: '4',
    address: '193.0.174.0',
    mask: '24',
    gateway: '0.0.0.0',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: '5',
    address: '193.0.175.0',
    mask: '25',
    gateway: '193.0.174.10',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: '6',
    address: '193.0.175.22',
    mask: '32',
    gateway: '193.0.174.1',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: '7',
    address: '172.16.0.0',
    mask: '16',
    gateway: '10.1.30.1',
    interface: 'Гостевая сеть',
  },
  {
    uuid: '8',
    address: '192.168.100.0',
    mask: '24',
    gateway: '192.168.1.1',
    interface: 'Домашняя сеть',
  },
];
