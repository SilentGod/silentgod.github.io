var data = {
	catalog: [
		{
			cid: 0,
			pid: -1,
			txt: 'Web学习',
		},
		{
			cid: 1,
			pid: 0,
			txt: 'HTML',
		},
		{
			cid: 2,
			pid: 0,
			txt: 'CSS',
		},
		{
			cid: 3,
			pid: 0,
			txt: 'JavaScript',
		},
		{
			cid: 4,
			pid: -1,
			txt: '观后感',
		},
		{
			cid: 5,
			pid: 4,
			txt: '图书',
		},
		{
			cid: 6,
			pid: 4,
			txt: '电影',
		},
		{
			cid: 7,
			pid: -1,
			txt: '英语',
		},
		{
			cid: 8,
			pid: -1,
			txt: '健身',
		}
	],
	notes:[
		{
			nid: 0,
			pid: 1,
			title: '浅淡HTML5移动Web开发',
			md: '说实话，我们这次开发移动端的项目，整个项目组的人都是第一次，最初立项的时候为是选择native app和web app还争论了一番，最后综合考虑，我们选择了web（我们选择了h5）开发。但从这两种开发模式的特点来说，从它们诞生之日起就开始了不断的争论，孰好孰坏，本文不作探讨，只是简单罗列下本人开发遇到的问题和最终的解决方案。\n### 1. 响应式web设计 \n说到这个，移动开发面对的屏幕尺寸那叫一个丰富，其中安卓阵营就够让人头痛的。我们在PC端常用的两种布局方式就是固定布局和弹性布局，前者设置一个绝大多数电脑能正常显示的固定宽度居中显示，后者则采用百分比。关于这两者讨论的文章很多，有兴趣的自己查阅下，我今天要介绍的就是相信你已经听过的”响应式布局”，响应式布局意味着媒体查询，这个在css2就已经出现的东西随着html5、css3的到来又增添了新的生机。\n（1）.媒体查询初探。媒体查询并非新出现的技术，如下：\n``` html\n<link rel="stylesheet" media="screen" href="style.css" />\n```\n其中就使用了媒体查询，通过 标签的media属性为样式表指定了设备类型，当然CSS3时代的媒体查询更加丰富。',
			content: '说实话，我们这次开发移动端的项目，整个项目组的人都是第一次，最初立项的时候为是选择',
			date: '2015-07-20'
		},
		{
			nid: 2,
			pid: 3,
			title: '朴灵评注--JavaScript 运行机制详解：再谈Event Loop',
			md: '一年前，我写了一篇《什么是 Event Loop？》，谈了我对Event Loop的理解。\n上个月，我偶然看到了Philip Roberts的演讲《Help, I am stuck in an event-loop》。这才尴尬地发现，自己的理解是错的。我决定重写这个题目，详细、完整、正确地描述JavaScript引擎的内部运行机制。下面就是我的重写。',
			content: '一年前，我写了一篇《什么是 Event Loop？》，谈了我对Event Loop的理解。上个月，我偶然看到了Philip Roberts的演讲《Help, I am stuck in an event-loop》。这才尴尬地发现，自己的理解是错的。我决定重写这个题目，详细、完整、正确地描述JavaScript引擎的内部运行机制。下面就是我的重写。',
			date: '2015-07-23'
		}
	]
}