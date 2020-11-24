export const seriesMapData = [
  { name: '海淀区', itemStyle: { areaColor: '#72C220' }, select: false },
  { name: '东城区', itemStyle: { areaColor: '#23B0B5' }, select: false },
  { name: '西城区', itemStyle: { areaColor: '#097F27' }, select: false },
  { name: '通州区', itemStyle: { areaColor: '#081140' }, select: false },
  { name: '亦庄区', value: '0' },
  { name: '朝阳区', itemStyle: { areaColor: '#8F0A20' } },
  { name: '石景山区', itemStyle: { areaColor: '#B8661B' } },
  { name: '丰台区', itemStyle: { areaColor: '#85711C' } },
  {
    name: '昌平区', itemStyle: {
      areaColor: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [{ offset: 0, color: '#007ECF' }, { offset: 1, color: '#041E59' }],
        globalCoord: false,
      },
    }
  },
  {
    name: '大兴区', itemStyle: {
      areaColor: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [{ offset: 0, color: '#061749', }, { offset: 1, color: '#051A51', }],
        globalCoord: false,
      },
    },
  },
  {
    name: '门头沟区', itemStyle: {
      areaColor: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [{ offset: 0, color: '#007ECF' }, { offset: 1, color: '#041E59' }],
        globalCoord: false,
      },
    },
  },
  {
    name: '顺义区', itemStyle: {
      areaColor: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [{ offset: 0, color: '#03377B' }, { offset: 1, color: '#071344' }],
        globalCoord: false,
      },
    },
  },
  {
    name: '怀柔区', itemStyle: {
      areaColor: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [{ offset: 0, color: '#0094E8' }, { offset: 1, color: '#01509A' }],
        globalCoord: false // 缺省为 false
      },
    },
  },
  {
    name: '密云区', itemStyle: {
      areaColor: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [{ offset: 0, color: '#01549F' }, { offset: 1, color: '#02357A' }],
        globalCoord: false,
      },
    },
  },
  {
    name: '平谷区', itemStyle: {
      areaColor: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [{ offset: 0, color: '#042362' }, { offset: 1, color: '#081140' }],
        globalCoord: false,
      },
    },
  },
  {
    name: '延庆区', itemStyle: {
      areaColor: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [{ offset: 0, color: '#0096EA' }, { offset: 1, color: '#006AB9' }],
        globalCoord: false,
      },
    },
  },
  {
    name: '房山区', itemStyle: {
      areaColor: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [{ offset: 0, color: '#023F86' }, { offset: 1, color: '#02276B' }],
        globalCoord: false // 缺省为 false
      },
    },
  },
]