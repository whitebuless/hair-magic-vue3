<template>
  <div class="sideBarBox">
    <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="vertical"
    :items="items"
    @click="handleClick"
  />
  <button @click="addNewOrder"><strong>游客+</strong></button>
  <button @click="addNewMerchant"><strong>新开店铺</strong></button>
  </div>

  <a-modal v-model:open="open" title="新开店铺" @ok="handleOk" >
    <a-form>
      <a-form-item label="店名"><a-input v-model:value="newMerchant.name"></a-input></a-form-item>
      <a-form-item label="联系方式"><a-input v-model:value="newMerchant.phoneNumber"></a-input></a-form-item>
      <a-form-item label="描述"><a-input v-model:value="newMerchant.description"></a-input></a-form-item>
      <a-form-item has-feedback label="位置" name="location">
          <a-cascader v-model:value="locationProvince" 
          :options="options" 
          placeholder="选择位置" />
      </a-form-item>
      <a-form-item label="具体位置"><a-input v-model:value="newMerchant.location"></a-input></a-form-item>
    </a-form>  
  </a-modal>
</template>
<script setup>
import { computed, h, ref,watch } from 'vue';
import router from '../../../../router';
import { addMerchantApi } from '../../../../apis/merchantApi';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useUserStore } from '../../../../stores/user';
import { emptyProps } from 'ant-design-vue/es/empty';
const userStore=useUserStore()
// 定义emit
const emit = defineEmits(["add-new"]);
function addNewOrder(){
 emit("add-new")
}
// 控制新增店铺窗口
const open=ref(false)
// 新店铺信息
const newMerchant=ref({

})

const locationProvince=ref('')
// 监听 location 的变化
watch(locationProvince, (newValue) => {
  // 更新 detailLocation
  newMerchant.value.location = newValue.join('');
});


const options = [
  {
    value: '山东省',
    label: '山东省',
    children: [
    {
        "value": "济南市",
        "label": "济南市"
    },
    {
        "value": "青岛市",
        "label": "青岛市"
    },
    {
        "value": "淄博市",
        "label": "淄博市"
    },
    {
        "value": "枣庄市",
        "label": "枣庄市"
    },
    {
        "value": "东营市",
        "label": "东营市"
    },
    {
        "value": "烟台市",
        "label": "烟台市"
    },
    {
        "value": "潍坊市",
        "label": "潍坊市"
    },
    {
        "value": "济宁市",
        "label": "济宁市"
    },
    {
        "value": "泰安市",
        "label": "泰安市"
    },
    {
        "value": "威海市",
        "label": "威海市"
    },
    {
        "value": "日照市",
        "label": "日照市"
    },
    {
        "value": "滨州市",
        "label": "滨州市"
    },
    {
        "value": "德州市",
        "label": "德州市"
    },
    {
        "value": "聊城市",
        "label": "聊城市"
    },
    {
        "value": "临沂市",
        "label": "临沂市"
    },
    {
        "value": "菏泽市",
        "label": "菏泽市"
    }
    ],
  },
  {
        value: "北京市",
        label: "北京市",
        children: [
            {
                value: "东城区",
                label: "东城区"
            },
            {
                value: "西城区",
                label: "西城区"
            },
            {
                value: "朝阳区",
                label: "朝阳区"
            },
            {
                value: "海淀区",
                label: "海淀区"
            },
            {
                value: "石景山区",
                label: "石景山区"
            }
        ]
  },
  {
      value: "天津省",
      label: "天津省",
      children: [
          {
              value: "天津市",
              label: "天津市"
          }
      ]
  },
  {
        value: "河北省",
        label: "河北省",
        children: [
            {
                value: "石家庄",
                label: "石家庄"
            },
            {
                value: "唐山市",
                label: "唐山市"
            },
            {
                value: "秦皇岛",
                label: "秦皇岛"
            },
            {
                value: "邯郸市",
                label: "邯郸市"
            },
            {
                value: "邢台市",
                label: "邢台市"
            },
            {
                value: "保定市",
                label: "保定市"
            },
            {
                value: "张家口",
                label: "张家口"
            },
            {
                value: "承德市",
                label: "承德市"
            },
            {
                value: "沧州市",
                label: "沧州市"
            },
            {
                value: "廊坊市",
                label: "廊坊市"
            },
            {
                value: "衡水市",
                label: "衡水市"
            }
        ]
  },
  {
        value: "山西省",
        label: "山西省",
        children: [
            {
                value: "太原市",
                label: "太原市"
            },
            {
                value: "大同市",
                label: "大同市"
            },
            {
                value: "阳泉市",
                label: "阳泉市"
            },
            {
                value: "长治市",
                label: "长治市"
            },
            {
                value: "晋城市",
                label: "晋城市"
            },
            {
                value: "朔州市",
                label: "朔州市"
            },
            {
                value: "晋中市",
                label: "晋中市"
            },
            {
                value: "运城市",
                label: "运城市"
            },
            {
                value: "忻州市",
                label: "忻州市"
            },
            {
                value: "临汾市",
                label: "临汾市"
            },
            {
                value: "吕梁市",
                label: "吕梁市"
            }
        ]
  },
  {
        value: "内蒙古省",
        label: "内蒙古省",
        children: [
            {
                value: "呼和浩特",
                label: "呼和浩特"
            },
            {
                value: "包头市",
                label: "包头市"
            },
            {
                value: "乌海市",
                label: "乌海市"
            },
            {
                value: "赤峰市",
                label: "赤峰市"
            },
            {
                value: "通辽市",
                label: "通辽市"
            },
            {
                value: "鄂尔多斯市",
                label: "鄂尔多斯市"
            },
            {
                value: "呼伦贝尔市",
                label: "呼伦贝尔市"
            },
            {
                value: "巴彦淖尔市",
                label: "巴彦淖尔市"
            },
            {
                value: "乌兰察布市",
                label: "乌兰察布市"
            },
            {
                value: "兴安盟市",
                label: "兴安盟市"
            },
            {
                value: "锡林郭勒盟市",
                label: "锡林郭勒盟市"
            },
            {
                value: "阿拉善盟市",
                label: "阿拉善盟市"
            }
        ]
  },
  {
        value: "辽宁省",
        label: "辽宁省",
        children: [
            {
                value: "沈阳市",
                label: "沈阳市"
            },
            {
                value: "大连市",
                label: "大连市"
            },
            {
                value: "鞍山市",
                label: "鞍山市"
            },
            {
                value: "抚顺市",
                label: "抚顺市"
            },
            {
                value: "本溪市",
                label: "本溪市"
            },
            {
                value: "丹东市",
                label: "丹东市"
            },
            {
                value: "锦州市",
                label: "锦州市"
            },
            {
                value: "营口市",
                label: "营口市"
            },
            {
                value: "阜新市",
                label: "阜新市"
            },
            {
                value: "辽阳市",
                label: "辽阳市"
            },
            {
                value: "盘锦市",
                label: "盘锦市"
            },
            {
                value: "铁岭市",
                label: "铁岭市"
            },
            {
                value: "朝阳市",
                label: "朝阳市"
            },
            {
                value: "葫芦岛市",
                label: "葫芦岛市"
            }
        ]
  },
  {
        value: "吉林省",
        label: "吉林省",
        children: [
            {
                value: "长春市",
                label: "长春市"
            },
            {
                value: "吉林市",
                label: "吉林市"
            },
            {
                value: "四平市",
                label: "四平市"
            },
            {
                value: "辽源市",
                label: "辽源市"
            },
            {
                value: "通化市",
                label: "通化市"
            },
            {
                value: "白山市",
                label: "白山市"
            },
            {
                value: "松原市",
                label: "松原市"
            },
            {
                value: "白城市",
                label: "白城市"
            },
            {
                value: "延边朝鲜族自治州",
                label: "延边朝鲜族自治州"
            }
        ]
  },
  {
        value: "黑龙江省",
        label: "黑龙江省",
        children: [
            {
                value: "哈尔滨",
                label: "哈尔滨"
            },
            {
                value: "齐齐哈尔",
                label: "齐齐哈尔"
            },
            {
                value: "鸡西",
                label: "鸡西"
            },
            {
                value: "鹤岗",
                label: "鹤岗"
            },
            {
                value: "双鸭山",
                label: "双鸭山"
            },
            {
                value: "大庆",
                label: "大庆"
            },
            {
                value: "伊春",
                label: "伊春"
            },
            {
                value: "佳木斯",
                label: "佳木斯"
            },
            {
                value: "七台河",
                label: "七台河"
            },
            {
                value: "牡丹江",
                label: "牡丹江"
            },
            {
                value: "黑河",
                label: "黑河"
            },
            {
                value: "绥化",
                label: "绥化"
            },
            {
                value: "大兴安岭地区",
                label: "大兴安岭地区"
            }
        ]
  },
  {
        value: "上海省",
        label: "上海省",
        children: [
            {
                value: "上海市",
                label: "上海市"
            }
        ]
  },
  {
        value: "江苏省",
        label: "江苏省",
        children: [
            {
                value: "南京",
                label: "南京"
            },
            {
                value: "无锡",
                label: "无锡"
            },
            {
                value: "徐州",
                label: "徐州"
            },
            {
                value: "常州",
                label: "常州"
            },
            {
                value: "苏州",
                label: "苏州"
            },
            {
                value: "南通",
                label: "南通"
            },
            {
                value: "连云港",
                label: "连云港"
            },
            {
                value: "淮安",
                label: "淮安"
            },
            {
                value: "盐城",
                label: "盐城"
            },
            {
                value: "扬州",
                label: "扬州"
            },
            {
                value: "镇江",
                label: "镇江"
            },
            {
                value: "泰州",
                label: "泰州"
            },
            {
                value: "宿迁",
                label: "宿迁"
            }
        ]
  },
  {
        value: "浙江省",
        label: "浙江省",
        children: [
            {
                value: "杭州",
                label: "杭州"
            },
            {
                value: "宁波",
                label: "宁波"
            },
            {
                value: "温州",
                label: "温州"
            },
            {
                value: "嘉兴",
                label: "嘉兴"
            },
            {
                value: "湖州",
                label: "湖州"
            },
            {
                value: "绍兴",
                label: "绍兴"
            },
            {
                value: "金华",
                label: "金华"
            },
            {
                value: "衢州",
                label: "衢州"
            },
            {
                value: "舟山",
                label: "舟山"
            },
            {
                value: "台州",
                label: "台州"
            },
            {
                value: "丽水",
                label: "丽水"
            }
        ]
  },
  {
        value: "安徽省",
        label: "安徽省",
        children: [
            {
                value: "合肥",
                label: "合肥"
            },
            {
                value: "芜湖",
                label: "芜湖"
            },
            {
                value: "蚌埠",
                label: "蚌埠"
            },
            {
                value: "淮南",
                label: "淮南"
            },
            {
                value: "马鞍山",
                label: "马鞍山"
            },
            {
                value: "淮北",
                label: "淮北"
            },
            {
                value: "铜陵",
                label: "铜陵"
            },
            {
                value: "安庆",
                label: "安庆"
            },
            {
                value: "黄山",
                label: "黄山"
            },
            {
                value: "滁州",
                label: "滁州"
            },
            {
                value: "阜阳",
                label: "阜阳"
            },
            {
                value: "宿州",
                label: "宿州"
            },
            {
                value: "六安",
                label: "六安"
            },
            {
                value: "亳州",
                label: "亳州"
            },
            {
                value: "池州",
                label: "池州"
            },
            {
                value: "宣城",
                label: "宣城"
            }
        ]
  },
  {
        value: "福建省",
        label: "福建省",
        children: [
            {
                value: "福州",
                label: "福州"
            },
            {
                value: "厦门",
                label: "厦门"
            },
            {
                value: "莆田",
                label: "莆田"
            },
            {
                value: "三明",
                label: "三明"
            },
            {
                value: "泉州",
                label: "泉州"
            },
            {
                value: "漳州",
                label: "漳州"
            },
            {
                value: "南平",
                label: "南平"
            },
            {
                value: "龙岩",
                label: "龙岩"
            },
            {
                value: "宁德",
                label: "宁德"
            }
        ]
  },
  {
        value: "江西省",
        label: "江西省",
        children: [
            {
                value: "南昌",
                label: "南昌"
            },
            {
                value: "景德镇",
                label: "景德镇"
            },
            {
                value: "萍乡",
                label: "萍乡"
            },
            {
                value: "九江",
                label: "九江"
            },
            {
                value: "新余",
                label: "新余"
            },
            {
                value: "鹰潭",
                label: "鹰潭"
            },
            {
                value: "赣州",
                label: "赣州"
            },
            {
                value: "吉安",
                label: "吉安"
            },
            {
                value: "宜春",
                label: "宜春"
            },
            {
                value: "抚州",
                label: "抚州"
            },
            {
                value: "上饶",
                label: "上饶"
            }
        ]
  },
  {
        value: "河南省",
        label: "河南省",
        children: [
            {
                value: "郑州",
                label: "郑州"
            },
            {
                value: "开封",
                label: "开封"
            },
            {
                value: "洛阳",
                label: "洛阳"
            },
            {
                value: "平顶山",
                label: "平顶山"
            },
            {
                value: "安阳",
                label: "安阳"
            },
            {
                value: "鹤壁",
                label: "鹤壁"
            },
            {
                value: "新乡",
                label: "新乡"
            },
            {
                value: "焦作",
                label: "焦作"
            },
            {
                value: "濮阳",
                label: "濮阳"
            },
            {
                value: "许昌",
                label: "许昌"
            },
            {
                value: "漯河",
                label: "漯河"
            },
            {
                value: "三门峡",
                label: "三门峡"
            },
            {
                value: "南阳",
                label: "南阳"
            },
            {
                value: "商丘",
                label: "商丘"
            },
            {
                value: "信阳",
                label: "信阳"
            },
            {
                value: "周口",
                label: "周口"
            },
            {
                value: "驻马店",
                label: "驻马店"
            },
            {
                value: "济源",
                label: "济源"
            }
        ]
  },
  {
        value: "湖北省",
        label: "湖北省",
        children: [
            {
                value: "武汉",
                label: "武汉"
            },
            {
                value: "黄石",
                label: "黄石"
            },
            {
                value: "十堰",
                label: "十堰"
            },
            {
                value: "宜昌",
                label: "宜昌"
            },
            {
                value: "襄阳",
                label: "襄阳"
            },
            {
                value: "鄂州",
                label: "鄂州"
            },
            {
                value: "荆门",
                label: "荆门"
            },
            {
                value: "孝感",
                label: "孝感"
            },
            {
                value: "荆州",
                label: "荆州"
            },
            {
                value: "黄冈",
                label: "黄冈"
            },
            {
                value: "咸宁",
                label: "咸宁"
            },
            {
                value: "随州",
                label: "随州"
            },
            {
                value: "恩施土家族苗族自治州",
                label: "恩施土家族苗族自治州"
            },
            {
                value: "仙桃",
                label: "仙桃"
            },
            {
                value: "潜江",
                label: "潜江"
            },
            {
                value: "天门",
                label: "天门"
            },
            {
                value: "神农架林区",
                label: "神农架林区"
            }
        ]
  },
  {
        value: "湖南省",
        label: "湖南省",
        children: [
            {
                value: "长沙",
                label: "长沙"
            },
            {
                value: "株洲",
                label: "株洲"
            },
            {
                value: "湘潭",
                label: "湘潭"
            },
            {
                value: "衡阳",
                label: "衡阳"
            },
            {
                value: "邵阳",
                label: "邵阳"
            },
            {
                value: "岳阳",
                label: "岳阳"
            },
            {
                value: "常德",
                label: "常德"
            },
            {
                value: "张家界",
                label: "张家界"
            },
            {
                value: "益阳",
                label: "益阳"
            },
            {
                value: "郴州",
                label: "郴州"
            },
            {
                value: "永州",
                label: "永州"
            },
            {
                value: "怀化",
                label: "怀化"
            },
            {
                value: "娄底",
                label: "娄底"
            },
            {
                value: "湘西土家族苗族自治州",
                label: "湘西土家族苗族自治州"
            }
        ]
  },
  {
        value: "广东省",
        label: "广东省",
        children: [
            {
                value: "广州",
                label: "广州"
            },
            {
                value: "韶关",
                label: "韶关"
            },
            {
                value: "深圳",
                label: "深圳"
            },
            {
                value: "珠海",
                label: "珠海"
            },
            {
                value: "汕头",
                label: "汕头"
            },
            {
                value: "佛山",
                label: "佛山"
            },
            {
                value: "江门",
                label: "江门"
            },
            {
                value: "湛江",
                label: "湛江"
            },
            {
                value: "茂名",
                label: "茂名"
            },
            {
                value: "肇庆",
                label: "肇庆"
            },
            {
                value: "惠州",
                label: "惠州"
            },
            {
                value: "梅州",
                label: "梅州"
            },
            {
                value: "汕尾",
                label: "汕尾"
            },
            {
                value: "河源",
                label: "河源"
            },
            {
                value: "阳江",
                label: "阳江"
            },
            {
                value: "清远",
                label: "清远"
            },
            {
                value: "东莞",
                label: "东莞"
            },
            {
                value: "中山",
                label: "中山"
            },
            {
                value: "潮州",
                label: "潮州"
            },
            {
                value: "揭阳",
                label: "揭阳"
            },
            {
                value: "云浮",
                label: "云浮"
            }
        ]
  },
  {
        value: "广西省",
        label: "广西省",
        children: [
            {
                value: "南宁",
                label: "南宁"
            },
            {
                value: "柳州",
                label: "柳州"
            },
            {
                value: "桂林",
                label: "桂林"
            },
            {
                value: "梧州",
                label: "梧州"
            },
            {
                value: "北海",
                label: "北海"
            },
            {
                value: "防城港",
                label: "防城港"
            },
            {
                value: "钦州",
                label: "钦州"
            },
            {
                value: "贵港",
                label: "贵港"
            },
            {
                value: "玉林",
                label: "玉林"
            },
            {
                value: "百色",
                label: "百色"
            },
            {
                value: "贺州",
                label: "贺州"
            },
            {
                value: "河池",
                label: "河池"
            },
            {
                value: "来宾",
                label: "来宾"
            },
            {
                value: "崇左",
                label: "崇左"
            }
        ]
  },
  {
        value: "海南省",
        label: "海南省",
        children: [
            {
                value: "海口",
                label: "海口"
            },
            {
                value: "三亚",
                label: "三亚"
            },
            {
                value: "三沙",
                label: "三沙"
            },
            {
                value: "儋州",
                label: "儋州"
            },
            {
                value: "五指山",
                label: "五指山"
            },
            {
                value: "琼海",
                label: "琼海"
            },
            {
                value: "文昌",
                label: "文昌"
            },
            {
                value: "万宁",
                label: "万宁"
            },
            {
                value: "东方",
                label: "东方"
            },
            {
                value: "定安县",
                label: "定安县"
            },
            {
                value: "屯昌县",
                label: "屯昌县"
            },
            {
                value: "澄迈县",
                label: "澄迈县"
            },
            {
                value: "临高县",
                label: "临高县"
            },
            {
                value: "白沙黎族自治县",
                label: "白沙黎族自治县"
            },
            {
                value: "昌江黎族自治县",
                label: "昌江黎族自治县"
            },
            {
                value: "乐东黎族自治县",
                label: "乐东黎族自治县"
            },
            {
                value: "陵水黎族自治县",
                label: "陵水黎族自治县"
            },
            {
                value: "保亭黎族苗族自治县",
                label: "保亭黎族苗族自治县"
            },
            {
                value: "琼中黎族苗族自治县",
                label: "琼中黎族苗族自治县"
            }
        ]
  },
  {
        value: "重庆省",
        label: "重庆省",
        children: [
            {
                value: "重庆市",
                label: "重庆市"
            }
        ]
  },
  {
        value: "四川省",
        label: "四川省",
        children: [
            {
                value: "成都",
                label: "成都"
            },
            {
                value: "自贡",
                label: "自贡"
            },
            {
                value: "攀枝花",
                label: "攀枝花"
            },
            {
                value: "泸州",
                label: "泸州"
            },
            {
                value: "德阳",
                label: "德阳"
            },
            {
                value: "绵阳",
                label: "绵阳"
            },
            {
                value: "广元",
                label: "广元"
            },
            {
                value: "遂宁",
                label: "遂宁"
            },
            {
                value: "内江",
                label: "内江"
            },
            {
                value: "乐山",
                label: "乐山"
            },
            {
                value: "南充",
                label: "南充"
            },
            {
                value: "眉山",
                label: "眉山"
            },
            {
                value: "宜宾",
                label: "宜宾"
            },
            {
                value: "广安",
                label: "广安"
            },
            {
                value: "达州",
                label: "达州"
            },
            {
                value: "雅安",
                label: "雅安"
            },
            {
                value: "巴中",
                label: "巴中"
            },
            {
                value: "资阳",
                label: "资阳"
            },
            {
                value: "阿坝藏族羌族自治州",
                label: "阿坝藏族羌族自治州"
            },
            {
                value: "甘孜藏族自治州",
                label: "甘孜藏族自治州"
            },
            {
                value: "凉山彝族自治州",
                label: "凉山彝族自治州"
            }
        ]
  },
  {
        value: "贵州省",
        label: "贵州省",
        children: [
            {
                value: "贵阳",
                label: "贵阳"
            },
            {
                value: "六盘水",
                label: "六盘水"
            },
            {
                value: "遵义",
                label: "遵义"
            },
            {
                value: "安顺",
                label: "安顺"
            },
            {
                value: "毕节",
                label: "毕节"
            },
            {
                value: "铜仁",
                label: "铜仁"
            },
            {
                value: "黔西南布依族苗族自治州",
                label: "黔西南布依族苗族自治州"
            },
            {
                value: "黔东南苗族侗族自治州",
                label: "黔东南苗族侗族自治州"
            },
            {
                value: "黔南布依族苗族自治州",
                label: "黔南布依族苗族自治州"
            }
        ]
  },
  {
        value: "云南省",
        label: "云南省",
        children: [
            {
                value: "昆明",
                label: "昆明"
            },
            {
                value: "曲靖",
                label: "曲靖"
            },
            {
                value: "玉溪",
                label: "玉溪"
            },
            {
                value: "保山",
                label: "保山"
            },
            {
                value: "昭通",
                label: "昭通"
            },
            {
                value: "丽江",
                label: "丽江"
            },
            {
                value: "普洱",
                label: "普洱"
            },
            {
                value: "临沧",
                label: "临沧"
            },
            {
                value: "楚雄彝族自治州",
                label: "楚雄彝族自治州"
            },
            {
                value: "红河哈尼族彝族自治州",
                label: "红河哈尼族彝族自治州"
            },
            {
                value: "文山壮族苗族自治州",
                label: "文山壮族苗族自治州"
            },
            {
                value: "西双版纳傣族自治州",
                label: "西双版纳傣族自治州"
            },
            {
                value: "大理白族自治州",
                label: "大理白族自治州"
            },
            {
                value: "德宏傣族景颇族自治州",
                label: "德宏傣族景颇族自治州"
            },
            {
                value: "怒江傈僳族自治州",
                label: "怒江傈僳族自治州"
            },
            {
                value: "迪庆藏族自治州",
                label: "迪庆藏族自治州"
            }
        ]
  },
  {
        value: "西藏省",
        label: "西藏省",
        children: [
            {
                value: "拉萨",
                label: "拉萨"
            },
            {
                value: "日喀则",
                label: "日喀则"
            },
            {
                value: "昌都",
                label: "昌都"
            },
            {
                value: "林芝",
                label: "林芝"
            },
            {
                value: "山南",
                label: "山南"
            },
            {
                value: "那曲",
                label: "那曲"
            },
            {
                value: "阿里地区",
                label: "阿里地区"
            }
        ]
  },
  {
        value: "陕西省",
        label: "陕西省",
        children: [
            {
                value: "西安",
                label: "西安"
            },
            {
                value: "铜川",
                label: "铜川"
            },
            {
                value: "宝鸡",
                label: "宝鸡"
            },
            {
                value: "咸阳",
                label: "咸阳"
            },
            {
                value: "渭南",
                label: "渭南"
            },
            {
                value: "延安",
                label: "延安"
            },
            {
                value: "汉中",
                label: "汉中"
            },
            {
                value: "榆林",
                label: "榆林"
            },
            {
                value: "安康",
                label: "安康"
            },
            {
                value: "商洛",
                label: "商洛"
            }
        ]
  },
  {
        value: "甘肃省",
        label: "甘肃省",
        children: [
            {
                value: "兰州",
                label: "兰州"
            },
            {
                value: "嘉峪关",
                label: "嘉峪关"
            },
            {
                value: "金昌",
                label: "金昌"
            },
            {
                value: "白银",
                label: "白银"
            },
            {
                value: "天水",
                label: "天水"
            },
            {
                value: "武威",
                label: "武威"
            },
            {
                value: "张掖",
                label: "张掖"
            },
            {
                value: "平凉",
                label: "平凉"
            },
            {
                value: "酒泉",
                label: "酒泉"
            },
            {
                value: "庆阳",
                label: "庆阳"
            },
            {
                value: "定西",
                label: "定西"
            },
            {
                value: "陇南",
                label: "陇南"
            },
            {
                value: "临夏回族自治州",
                label: "临夏回族自治州"
            },
            {
                value: "甘南藏族自治州",
                label: "甘南藏族自治州"
            }
        ]
  },
  {
        value: "青海省",
        label: "青海省",
        children: [
            {
                value: "西宁",
                label: "西宁"
            },
            {
                value: "海东",
                label: "海东"
            },
            {
                value: "海北藏族自治州",
                label: "海北藏族自治州"
            },
            {
                value: "黄南藏族自治州",
                label: "黄南藏族自治州"
            },
            {
                value: "海南藏族自治州",
                label: "海南藏族自治州"
            },
            {
                value: "果洛藏族自治州",
                label: "果洛藏族自治州"
            },
            {
                value: "玉树藏族自治州",
                label: "玉树藏族自治州"
            },
            {
                value: "海西蒙古族藏族自治州",
                label: "海西蒙古族藏族自治州"
            }
        ]
  },
  {
        value: "宁夏省",
        label: "宁夏省",
        children: [
            {
                value: "银川",
                label: "银川"
            },
            {
                value: "石嘴山",
                label: "石嘴山"
            },
            {
                value: "吴忠",
                label: "吴忠"
            },
            {
                value: "固原",
                label: "固原"
            },
            {
                value: "中卫",
                label: "中卫"
            }
        ]
  },
  {
        value: "新疆省",
        label: "新疆省",
        children: [
            {
                value: "乌鲁木齐",
                label: "乌鲁木齐"
            },
            {
                value: "克拉玛依",
                label: "克拉玛依"
            },
            {
                value: "吐鲁番",
                label: "吐鲁番"
            },
            {
                value: "哈密",
                label: "哈密"
            },
            {
                value: "昌吉回族自治州",
                label: "昌吉回族自治州"
            },
            {
                value: "博尔塔拉蒙古自治州",
                label: "博尔塔拉蒙古自治州"
            },
            {
                value: "巴音郭楞蒙古自治州",
                label: "巴音郭楞蒙古自治州"
            },
            {
                value: "阿克苏地区",
                label: "阿克苏地区"
            },
            {
                value: "克孜勒苏柯尔克孜自治州",
                label: "克孜勒苏柯尔克孜自治州"
            },
            {
                value: "喀什地区",
                label: "喀什地区"
            },
            {
                value: "和田地区",
                label: "和田地区"
            },
            {
                value: "伊犁哈萨克自治州",
                label: "伊犁哈萨克自治州"
            },
            {
                value: "塔城地区",
                label: "塔城地区"
            },
            {
                value: "阿勒泰地区",
                label: "阿勒泰地区"
            },
            {
                value: "石河子",
                label: "石河子"
            },
            {
                value: "阿拉尔",
                label: "阿拉尔"
            },
            {
                value: "图木舒克",
                label: "图木舒克"
            },
            {
                value: "五家渠",
                label: "五家渠"
            },
            {
                value: "北屯",
                label: "北屯"
            },
            {
                value: "铁门关",
                label: "铁门关"
            },
            {
                value: "双河",
                label: "双河"
            },
            {
                value: "可克达拉",
                label: "可克达拉"
            },
            {
                value: "昆玉",
                label: "昆玉"
            }
        ]
  },
  {
        value: "台湾省",
        label: "台湾省",
        children: [
            {
                value: "台北市",
                label: "台北市"
            },
            {
                value: "高雄市",
                label: "高雄市"
            },
            {
                value: "台南市",
                label: "台南市"
            },
            {
                value: "台中市",
                label: "台中市"
            },
            {
                value: "金门县",
                label: "金门县"
            },
            {
                value: "南投县",
                label: "南投县"
            },
            {
                value: "基隆市",
                label: "基隆市"
            },
            {
                value: "新竹市",
                label: "新竹市"
            },
            {
                value: "嘉义市",
                label: "嘉义市"
            },
            {
                value: "新北市",
                label: "新北市"
            },
            {
                value: "宜兰县",
                label: "宜兰县"
            },
            {
                value: "新竹县",
                label: "新竹县"
            },
            {
                value: "桃园市",
                label: "桃园市"
            },
            {
                value: "苗栗县",
                label: "苗栗县"
            },
            {
                value: "彰化县",
                label: "彰化县"
            },
            {
                value: "嘉义县",
                label: "嘉义县"
            },
            {
                value: "云林县",
                label: "云林县"
            },
            {
                value: "屏东县",
                label: "屏东县"
            },
            {
                value: "台东县",
                label: "台东县"
            },
            {
                value: "花莲县",
                label: "花莲县"
            },
            {
                value: "澎湖县",
                label: "澎湖县"
            },
            {
                value: "连江县",
                label: "连江县"
            },
            {
                value: "金门",
                label: "金门"
            },
            {
                value: "马祖",
                label: "马祖"
            },
            {
                value: "澎湖",
                label: "澎湖"
            },
            {
                value: "东沙",
                label: "东沙"
            },
            {
                value: "南沙",
                label: "南沙"
            }
        ]
  },
  {
        value: "香港市",
        label: "香港市",
        children: [
            {
                value: "中西区",
                label: "中西区"
            },
            {
                value: "湾仔区",
                label: "湾仔区"
            },
            {
                value: "东区",
                label: "东区"
            },
            {
                value: "南区",
                label: "南区"
            },
            {
                value: "油尖旺区",
                label: "油尖旺区"
            },
            {
                value: "深水埗区",
                label: "深水埗区"
            },
            {
                value: "九龙城区",
                label: "九龙城区"
            },
            {
                value: "黄大仙区",
                label: "黄大仙区"
            },
            {
                value: "观塘区",
                label: "观塘区"
            },
            {
                value: "荃湾区",
                label: "荃湾区"
            },
            {
                value: "屯门区",
                label: "屯门区"
            },
            {
                value: "元朗区",
                label: "元朗区"
            },
            {
                value: "北区",
                label: "北区"
            },
            {
                value: "大埔区",
                label: "大埔区"
            },
            {
                value: "西贡区",
                label: "西贡区"
            },
            {
                value: "沙田区",
                label: "沙田区"
            },
            {
                value: "葵青区",
                label: "葵青区"
            },
            {
                value: "离岛区",
                label: "离岛区"
            }
        ]
  },
   {
        value: "澳门市",
        label: "澳门市",
        children: [
            {
                value: "花地玛堂区",
                label: "花地玛堂区"
            },
            {
                value: "圣安多尼堂区",
                label: "圣安多尼堂区"
            },
            {
                value: "大堂区",
                label: "大堂区"
            },
            {
                value: "望德堂区",
                label: "望德堂区"
            },
            {
                value: "风顺堂区",
                label: "风顺堂区"
            },
            {
                value: "嘉模堂区",
                label: "嘉模堂区"
            },
            {
                value: "圣方济各堂区",
                label: "圣方济各堂区"
            },
            {
                value: "路凼填海区",
                label: "路凼填海区"
            },
            {
                value: "路环",
                label: "路环"
            }
        ]
  }
];
// 新增店铺
function addNewMerchant(){
  open.value=true
}
// 处理确定
function handleOk(){
  if(!newMerchant.value.name){message.error('请输入店名');return}
  if(!newMerchant.value.phoneNumber){message.error('请输入联系方式');return}
  if(!newMerchant.value.description){message.error('请输入店铺介绍');return}
  if(!newMerchant.value.description){message.error('请输入店铺介绍');return}
  if(!newMerchant.value.location){message.error('请输入店铺位置');return}
  if(newMerchant.value.location.indexOf(locationProvince.value.join(''))==-1){message.error('请输入完整地址信息');return}
  newMerchant.value.userId=userStore.userInfo.id
  addMerchantApi(newMerchant.value).then(res=>{
    if(res.data.code=='200'){
      message.success(res.data.data)
    }
    else{
      message.error(res.data.msg)
    }
  })
  open.value=false
}


const selectedKeys = ref([]);
const openKeys = ref([]);
const items = ref([
  {
    key: '1',
    icon: () => h(MailOutlined),
    label: '数据大屏',
    title: 'datashow',
  },
  {
    key: '2',
    icon: () => h(CalendarOutlined),
    label: '员工管理',
    title: 'staff',
  },
  {
    key: '3',
    icon: () => h(CalendarOutlined),
    label: '服务管理',
    title: 'business',
  },
  {
    key: '4',
    icon: () => h(CalendarOutlined),
    label: '会员管理',
    title: 'vip',
  },
  {
    key: '5',
    icon: () => h(CalendarOutlined),
    label: '订单管理',
    title: 'reservation',
  },

]);
const handleClick = menuInfo => {
  router.replace('/merchant/'+menuInfo.item.title)
};
</script>
<style lang="scss" scoped>
.sideBarBox{
  height: 992px;
  background-color: white;
  overflow: hidden;
}
button{
  margin: 5px;
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    border: 0;
    color: white;
    background-color:rgb(100, 0, 0);
    cursor: pointer;
    &:hover{
      background-color:rgb(52, 0, 0);
    }
  }
</style>