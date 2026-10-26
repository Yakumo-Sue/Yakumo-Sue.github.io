const geography = 'https://prts.wiki/w/泰拉大典:地理';
export const COUNTRIES = [
  {id:'victoria',name:'维多利亚',en:'VICTORIA',x:40,y:49,type:'country',regions:['伦蒂尼姆','小丘郡','多伦郡'],keywords:['维多利亚','伦蒂尼姆','深池','苇草'],intro:'王权、工业与地方贵族交织的国度。伦蒂尼姆及其周边的冲突，是主线后续篇章的重要舞台。',body:'阅读这一地区的故事，可以从小丘郡进入，再沿着伦蒂尼姆的不同阵营理解战争。国家、城市与人物在不同时期的立场需要分别观察。',source:geography+'/维多利亚'},
  {id:'leithanien',name:'莱塔尼亚',en:'LEITHANIEN',x:46,y:46,type:'country',regions:['崔林特尔梅','维谢海姆','沃伦姆德'],keywords:['莱塔尼亚','尘影','崔林特尔梅','沃伦姆德'],intro:'源石技艺与音乐深深嵌入社会的国度。宏大的艺术传统之下，普通人同样面对身份、权力与生存的选择。',body:'《沃伦姆德的薄暮》《尘影余音》和《崔林特尔梅之金》提供不同的观察角度：地方社会、音乐家命运，以及国家历史留下的回声。'},
  {id:'ursus',name:'乌萨斯',en:'URSUS',x:61,y:29,type:'country',regions:['圣骏堡','切尔诺伯格','泽尔格勒'],keywords:['乌萨斯','切尔诺伯格','人们，我们','相变临界'],intro:'幅员广阔的北方帝国。切尔诺伯格事件将罗德岛带入感染者处境、城市秩序与历史创伤之间。',body:'可从主线开端阅读，再将学生们的回忆与后续地方故事并置。不同叙述者的记忆不能简单视为相同时间、相同立场下的记录。'},
  {id:'gaul',name:'高卢',en:'GAUL · HISTORICAL',x:39,y:42,type:'historical',regions:['林贡斯','下高卢'],keywords:['高卢','傀影','猩红','遗尘'],intro:'已经消亡的历史政体，其遗产仍通过艺术、地名与人物记忆影响泰拉。',body:'高卢在本地图中以历史标记展示，不与现代国家的存续状态混同。阅读时可留意四国战争及其遗产在后世剧情中的不同呈现。'},
  {id:'laterano',name:'拉特兰',en:'LATERANO',x:47,y:60,type:'country',regions:['拉特兰城','安布罗修区'],keywords:['拉特兰','吾导先路','空想花庭','众生行记'],intro:'围绕信仰、律法与人与人之间的理解展开故事的国度。',body:'《吾导先路》《空想花庭》等故事分别从城市、旅途与具体人物切入。涉及律法和身份的深层信息建议在对应故事之后查阅。'},
  {id:'iberia',name:'伊比利亚',en:'IBERIA',x:29,y:64,type:'country',regions:['盐风城','格兰法洛','港都'],keywords:['伊比利亚','覆潮之下','愚人号','昨日海'],intro:'曾与大海紧密相连的国度。海岸上的沉默、审判庭与失落航行构成重要的剧情线索。',body:'可按《覆潮之下》《愚人号》及后续海洋故事的实装顺序阅读，再回看沿海聚落的处境。海域并不等同于陆地国家边界。'},
  {id:'aegir',name:'阿戈尔',en:'ÆGIR · THE OCEAN',x:20,y:79,type:'sea',regions:['海下城市','弥利亚留姆'],keywords:['阿戈尔','深海','生路','斯卡蒂','幽灵鲨'],intro:'与深海文明及深海猎人密切相关。陆地上的线索，只揭示了这片海域故事的一部分。',body:'本标记是海洋剧情的阅读入口，不代表已确认的地理坐标。建议结合《覆潮之下》《愚人号》《生路》等相关档案逐步理解。'},
  {id:'kjerag',name:'谢拉格',en:'KJERAG',x:52,y:39,type:'country',regions:['喀兰峰','图里卡姆','银心湖'],keywords:['谢拉格','风雪过境','银心湖','喀兰'],intro:'雪山、信仰与对外交流共同塑造的高山国度。传统和变化之间的张力贯穿其地方故事。',body:'从《风雪过境》到《银心湖列车》，可以关注家族、贸易、交通与个人选择之间的联系。'},
  {id:'kazimierz',name:'卡西米尔',en:'KAZIMIERZ',x:43,y:36,type:'country',regions:['大骑士领','滴水村'],keywords:['卡西米尔','临光','红松林','骑兵与猎人'],intro:'骑士传统与商业竞技并存的国度。荣誉如何被定义，是阅读其剧情的重要线索。',body:'《骑兵与猎人》提供地方视角；《玛莉娅·临光》《红松林》《长夜临光》进一步展开竞技场内外的命运。'},
  {id:'columbia',name:'哥伦比亚',en:'COLUMBIA',x:27,y:42,type:'country',regions:['特里蒙','麦克斯特区','铸铁城'],keywords:['哥伦比亚','莱茵','孤星','孤岛','绿野','未许之地'],intro:'科研、企业与开拓叙事交织的联邦。技术的进步往往与制度和个体的代价共同出现。',body:'莱茵生命相关故事可按《绿野幻梦》《孤星》等线索阅读；《孤岛风云》和其他地方故事则提供不同的社会切面。',source:geography+'/哥伦比亚'},
  {id:'bolivar',name:'玻利瓦尔',en:'BOLÍVAR',x:21,y:56,type:'country',regions:['多索雷斯','拉乌尼达','特科马'],keywords:['玻利瓦尔','多索雷斯','黑流','特科马'],intro:'不同势力与地方社会在此交错，多索雷斯的热闹与其他地区的现实形成对照。',body:'可从《多索雷斯假日》进入，再把地方故事与人物出身放回更大的地区背景。'},
  {id:'siracusa',name:'叙拉古',en:'SIRACUSA',x:40,y:60,type:'country',regions:['沃尔西尼','新沃尔西尼','七丘城'],keywords:['叙拉古','沃尔西尼','揭幕者','德克萨斯','拉普兰德'],intro:'家族秩序、城市生活与个人自由彼此纠缠的国度。',body:'《叙拉古人》与《揭幕者们》围绕城市与人物变化展开；德克萨斯、拉普兰德等人的经历提供持续的阅读线索。'},
  {id:'sargon',name:'萨尔贡',en:'SARGON',x:46,y:72,type:'country',regions:['阿卡胡拉','长泉镇','雨林与沙漠'],keywords:['萨尔贡','密林','长泉','沙洲','理想城'],intro:'地貌、城市与地方制度差异显著的广阔区域，不能用单一的生活图景概括。',body:'雨林、沙漠和地下聚落的故事有着不同视角。可从《密林悍将归来》《源尘行动》与《理想城》等相关内容交叉阅读。'},
  {id:'minos',name:'米诺斯',en:'MINOS',x:48,y:55,type:'country',regions:['雅赛努斯','科林尼亚'],keywords:['米诺斯','雅赛努斯','帕拉斯'],intro:'英雄叙事、城邦生活与普通人的抉择相互映照的国度。',body:'沿着相关人物与《雅赛努斯复仇记》等故事，可以观察被讲述的英雄传统如何进入现实生活。'},
  {id:'sami',name:'萨米',en:'SAMI',x:43,y:24,type:'country',regions:['冬牙群山','北地','因非冰原边缘'],keywords:['萨米','探索者','界园','北地'],intro:'与北地环境、部族生活和探索主题相连的地区。',body:'集成战略等模式中的叙事包含不同分支和可能性。阅读时应注意主题介绍、实际发生的记录与分支结局之间的区别。'},
  {id:'rim',name:'雷姆必拓',en:'RIM BILLITON',x:53,y:82,type:'country',regions:['矿区','零号公路','太阳谷'],keywords:['雷姆必拓','酸橙','矿区'],intro:'矿业、工业与劳作经验构成重要的地区叙事。',body:'关于开采、交通与日常生活的线索散见于干员档案和地区活动。可沿相关人物的经历进入，而非只看国家概述。'},
  {id:'yan',name:'大炎',en:'YAN',x:74,y:43,type:'country',regions:['百灶','龙门','尚蜀','玉门'],keywords:['大炎','龙门','岁','将进酒','登临意','辞岁','相见欢','画中人'],intro:'具有漫长历史与多样城市生活的国度。地方秩序、人情与更久远的传说共同进入故事。',body:'龙门主线、岁相关活动与不同城市的故事可以分别成线阅读。回忆和传说涉及跨度较大的年代，播放器保留原叙述顺序。',source:geography+'/炎'},
  {id:'higashi',name:'东国',en:'HIGASHI',x:82,y:49,type:'country',regions:['锁川','姬户','南北两院'],keywords:['东国','东','忍','常暗'],intro:'传统、现代城市与不同人物出身共同构成地区线索。',body:'相关信息可从地方故事和干员资料进入；名称“东”与“东国”在检索中统一关联。'},
  {id:'kazdel',name:'卡兹戴尔',en:'KAZDEL',x:55,y:49,type:'country',regions:['卡兹戴尔城','流动聚落'],keywords:['卡兹戴尔','巴别塔','生于黑夜','萨卡兹'],intro:'萨卡兹的历史、迁徙与重建主题在此交汇。巴别塔与罗德岛的往事也与它密切相连。',body:'《生于黑夜》《巴别塔》与相关主线可以互相参照。为保留叙事中的逐步揭示，建议先按实装或推荐顺序阅读。'},
  {id:'lungmen',name:'龙门',en:'LUNGMEN',x:68,y:48,type:'city',regions:['龙门近卫局','下城区','企鹅物流'],keywords:['龙门','喧闹','企鹅','鲤氏'],intro:'大炎的一座重要移动城市，也是罗德岛早期主线与多个地方故事的舞台。',body:'主线、企鹅物流与鲤氏侦探事务所相关故事展示了城市不同层面的生活。地图中龙门以城市类型单独标注。'},
  {id:'siesta',name:'汐斯塔',en:'SIESTA',x:35,y:70,type:'city',regions:['海岸','音乐节'],keywords:['汐斯塔','火蓝','火山'],intro:'以海岸生活和音乐节为鲜明印象的独立城邦。',body:'可从《火蓝之心》进入，再阅读《火山旅梦》等后续故事。历史时期不同，城市的状态也需要结合具体剧情理解。'},
  {id:'durin',name:'杜林',en:'DURIN · UNDERGROUND',x:null,y:null,type:'underground',regions:['际崖城','天际城'],keywords:['杜林','理想城','际崖城'],intro:'与地下城市和杜林居民生活相关的地区入口。',body:'可从《理想城》了解地下城市与地表来客的相遇。本条仅进入地区列表，不在缺少准确依据时补画地表国界。'},
  {id:'frozen',name:'因非冰原',en:'NORTHERN ICEFIELD',x:52,y:15,type:'region',regions:['泰拉北方'],keywords:['因非冰原','萨米','探索者'],intro:'与泰拉北方探索叙事相连的特殊地区。',body:'以地区图层管理，与现代国家分开。相关探索与分支结局应按其叙事性质阅读。'},
  {id:'fervid',name:'焚风热土',en:'FERVID HOTLANDS',x:53,y:92,type:'region',regions:['泰拉南方'],keywords:['焚风热土','萨尔贡'],intro:'与泰拉南方的地理边缘和探索线索相关的地区。',body:'本标记用于资料导航，不表示已经确定的区域边界。'}
].map(c=>({...c,source:c.source||geography}));

export const GROUPS = [
 {id:'rhodes',name:'罗德岛',en:'RHODES ISLAND',members:['阿米娅','凯尔希','迷迭香','杜宾','芙蓉','安赛尔'],keywords:['罗德岛','博士','阿米娅'],intro:'以感染者医疗与研究为重要目标的组织。图中展示相关干员的组织关联。',image:'assets/rhodes-logo.webp'},
 {id:'penguin',name:'企鹅物流',en:'PENGUIN LOGISTICS',members:['能天使','德克萨斯','可颂','空','安洁莉娜'],keywords:['企鹅','喧闹','德克萨斯'],intro:'从龙门街巷进入信使与运输的故事。图中“组织关联”包含明确的合作线索，不推导人物亲属关系。',image:'assets/rhodes-tower.svg'},
 {id:'karlan',name:'喀兰贸易',en:'KARLAN TRADE',members:['银灰','初雪','崖心','角峰','讯使','灵知','耶拉','极光'],keywords:['谢拉格','风雪','银心湖'],intro:'连接谢拉格地方故事、贸易与对外交流的阅读入口。相关人物的身份应结合剧情时期理解。',image:'assets/rhodes-tower.svg'},
 {id:'rhine',name:'莱茵生命',en:'RHINE LAB',members:['塞雷娅','赫默','伊芙利特','白面鸮','梅尔','麦哲伦','缪尔赛思','多萝西'],keywords:['莱茵','孤星','绿野'],intro:'科研活动与个人选择彼此交织。沿着不同部门与研究者，可以进入莱茵生命相关故事。',image:'assets/rhodes-tower.svg'}
];

export const WORLD_CHAPTERS = [
 {id:'originium',name:'源石 天灾 矿石病',en:'ORIGINIUM CATASTROPHE ORIPATHY',topics:[
  {id:'originium',name:'源石',en:'ORIGINIUM',intro:'源石深刻影响着泰拉的能源、技术与社会。',paragraphs:['从矿物的开采与加工，到城市动力与武器装备，源石进入了泰拉生活的许多层面。理解源石，也是理解这片大地上技术发展与社会矛盾的一条路径。','源石、天灾与矿石病彼此关联，但不宜用一句简单因果替代各自的设定。更多深层信息会在剧情中逐步揭示，初次阅读可先从基础概念开始。'],keywords:['源石','罗德岛','黑暗时代'],image:'assets/cg-main_8.webp'},
  {id:'arts',name:'源石技艺',en:'ORIGINIUM ARTS',intro:'通过源石相关机制施展的技艺，表现形式与使用者、媒介和训练密切相关。',paragraphs:['阅读源石技艺时，可以分别留意施术媒介、使用条件与实际效果。人物之间能力不同，叙述中的推测也不等于已经证实的统一规律。','技艺既进入日常技术和生产，也出现在医疗、战斗与艺术之中。'],keywords:['技艺','莱塔尼亚','尘影']},
  {id:'catastrophe',name:'天灾',en:'CATASTROPHE',intro:'影响泰拉社会组织、城市建设与迁徙方式的重要环境威胁。',paragraphs:['城市如何躲避风险，信使如何传递情报，以及灾后生活如何继续，都是天灾设定进入具体剧情的方式。移动城市也因此不只是一个视觉符号。','天灾信使为风险预警与信息流通工作，其经历可与人物档案、地方故事共同阅读。'],keywords:['天灾','黑暗时代','龙门']},
  {id:'oripathy',name:'矿石病',en:'ORIPATHY',intro:'与源石有关的疾病，也是一条贯穿泰拉社会与罗德岛故事的线索。',paragraphs:['矿石病既是医疗问题，也与感染者受到的制度、经济和社会待遇相连。不同国家、城市与人物的处境并不相同。','阅读时可以区分疾病本身、医疗实践与社会偏见，避免把某一人物或某一地的经验推广到整个泰拉。'],keywords:['感染者','罗德岛','乌萨斯']}
 ]},
 {id:'technology',name:'泰拉科技',en:'TECHNOLOGIES OF TERRA',topics:[
  {id:'energy',name:'源石技术',en:'ORIGINIUM TECHNOLOGY',intro:'围绕源石建立的技术，支撑着泰拉工业与日常生活。',paragraphs:['能源供应、加工制造与地区发展相互关联。观察具体国家和企业如何使用技术，往往比孤立阅读装备名词更有帮助。','科技水平并非在所有地区、所有行业均匀分布。'],keywords:['哥伦比亚','莱茵','雷姆必拓']},
  {id:'cities',name:'移动城市',en:'NOMADIC CITIES',intro:'城市可以移动，居民的社会关系与历史却不会因此简单消失。',paragraphs:['移动城市将工程、能源、交通与风险应对结合在一起。主线中的切尔诺伯格、龙门和伦蒂尼姆提供不同的阅读视角。','理解一座城市，需要同时观察其结构、管理者和不同群体的生活空间。'],keywords:['龙门','切尔诺伯格','伦蒂尼姆'],image:'assets/hero.webp'},
  {id:'equipment',name:'武器与装备',en:'WEAPONS AND EQUIPMENT',intro:'装备的形态来自技术、材料、使用者与地区传统的共同作用。',paragraphs:['从冷兵器到现代工业装备，名称相似并不意味着与现实世界有相同机理。具体能力与限制应以剧情、装备描述和设定来源为准。'],keywords:['黑钢','拉特兰','雷神']}
 ]},
 {id:'life',name:'泰拉生物',en:'LIFE ON TERRA',topics:[
  {id:'ecology',name:'生态与生物',en:'ECOLOGY',intro:'不同地貌孕育不同生活，也让泰拉的日常呈现丰富的生态面貌。',paragraphs:['常见动植物、畜养与食物，可以从日常故事与地方设定中理解。地域差异是观察这一章的合适起点。','海嗣、巨兽等特殊存在涉及独立的叙事层次与大量剧情信息，建议在相关故事后继续深入，不将它们简单归入普通动物分类。'],keywords:['密林','萨米','海嗣','泰拉饭'],image:'assets/cg-act9d0.webp'}
 ]},
 {id:'races',name:'泰拉种族',en:'PEOPLES OF TERRA',topics:[
  {id:'peoples',name:'种族与身份',en:'RACES AND IDENTITIES',intro:'种族、国籍与组织是不同维度，人物身份不能只由其中一个标签概括。',paragraphs:['菲林、黎博利、鲁珀、卡特斯、库兰塔、萨卡兹、萨科塔等名称，既涉及外形与出身，也连接文化和历史。','人物来自某一国家，并不代表同种族的人都来自那里。干员索引以已有明确字段为准；尚未核对的种族信息不做猜测填充。'],keywords:['萨卡兹','拉特兰','卡兹戴尔']}
 ]},
 {id:'countries',name:'国家和地区',en:'COUNTRIES AND REGIONS',topics:COUNTRIES.map(c=>({id:c.id,name:c.name,en:c.en,intro:c.intro,paragraphs:[c.body,'已知地点：'+c.regions.join('、')+'。点击时空地图可查看地区导航；位置标记为概略导航，不替代正式国界资料。'],keywords:c.keywords,country:c.id,source:c.source}))},
 {id:'organizations',name:'组织',en:'ORGANISATIONS IN TERRA',topics:[
  ...GROUPS.map(g=>({id:g.id,name:g.name,en:g.en,intro:g.intro,paragraphs:['结合关联故事，可以观察组织目标、成员经历与不同时期的变化。所属、合作和共同出场需要分别理解。','从关系图谱进入人物档案，或沿相关剧情返回时间轴继续阅读。'],keywords:g.keywords,group:g.id})),
  ...[['babel','巴别塔','BABEL','巴别塔','生于黑夜'],['reunion','整合运动','REUNION','整合运动','乌萨斯'],['blacksteel','黑钢国际','BLACKSTEEL WORLDWIDE','黑钢','不义之财'],['rusthammer','锈锤','RUSTHAMMER','锈锤','荒野'],['raythean','雷神工业','RAYTHEAN','雷神','工业'],['sunvalley','太阳谷机械工业','SUNVALLEY INDUSTRIES','太阳谷','雷姆必拓'],['lee','鲤氏侦探事务所',"LEE’S DETECTIVE AGENCY",'鲤氏','龙门']].map(([id,name,en,...keywords])=>({id,name,en,intro:name+'是了解相关人物与地方故事的一个入口。',paragraphs:['本条提供组织相关的剧情检索与原始资料入口。具体历史、人员与活动地区随故事时期而变化，详细设定请结合来源查阅。'],keywords}))
 ]}
];

export const PROFESSIONS={PIONEER:'先锋',WARRIOR:'近卫',TANK:'重装',SNIPER:'狙击',CASTER:'术师',MEDIC:'医疗',SUPPORT:'辅助',SPECIAL:'特种'};
export const FACTIONS={egir:'阿戈尔',rhodes:'罗德岛',lungmen:'龙门',yan:'炎',victoria:'维多利亚',leithanien:'莱塔尼亚',ursus:'乌萨斯',sargon:'萨尔贡',columbia:'哥伦比亚',kazimierz:'卡西米尔',kazdel:'卡兹戴尔',siracusa:'叙拉古',laterano:'拉特兰',iberia:'伊比利亚',kjerag:'谢拉格',minos:'米诺斯',rim:'雷姆必拓',sami:'萨米',higashi:'东国',bolivar:'玻利瓦尔',penguin:'企鹅物流',rhine:'莱茵生命',karlan:'喀兰贸易',blacksteel:'黑钢国际',abyssal:'深海猎人',lee:'鲤氏侦探事务所'};
