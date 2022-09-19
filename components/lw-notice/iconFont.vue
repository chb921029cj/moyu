 <template>
 	<text :style="{ color: color, 'font-size': size + 'rpx' }" :class="{isTheme:isTheme}" class="lw-icons" @click="_onClick">{{icons[icon]}}</text>
 </template>
 
 <script>
 	import icons from './icons.js';
 	// #ifdef APP-NVUE
 	var domModule = weex.requireModule('dom');
 	domModule.addRule('fontFace', {
 		'fontFamily': "iconfont",
 		'src': "url(\'https://at.alicdn.com/t/font_2294175_vq7ymlkpbtm.ttf\')",
 	});
 	// #endif
 	export default {
 		name: 'UniIcons',
 		props: {
 			icon: {
 				type: String,
 				default: ''
 			},
 			color: {
 				type: String,
 				default: '#333333'
 			},
 			size: {
 				type: [Number, String],
 				default: 50
 			},
			isTheme:{
				type:Boolean,
				default:false
			}
 		},
 		data() {
 			return {
 				icons: icons
 			}
 		},
 		methods: {
 			_onClick() {
 				this.$emit('click')
 			}
 		}
 	}
 </script>
 
 <style lang="scss" scoped>
 	/* #ifndef APP-NVUE */
 	@font-face {
 		font-family: iconfont;
 		src: url('https://at.alicdn.com/t/font_2294175_vq7ymlkpbtm.ttf')
 	}
 	/* #endif */
 	.lw-icons {
 		font-family: iconfont;
 		text-decoration: none;
 		text-align: center;
 	}
 </style>
 