<template>
	<view>
		<view
			class="contentBox"
			v-if="list.length"
			@click="toEmit()"
			:style="'color:' + color + ';background-color:' + backgroundColor + ';height:' + height+'rpx;'"
		>
			<view v-if="showIcon" class="supBox"><lwIcon :size="32" :color="iconColor" icon="sound"></lwIcon></view>
			<view v-if="list.length > 1" class="content">
				<view v-for="(item, index) in list" :key="index">
					<view
						class="loopItemBase"
						:class="index==0&&firstIn?'fistInClass':''"
						:animation="realAnimation(index)"
						v-if="aindexArr.includes(index)"
						:style="'line-height:'+height+'rpx;'"
					>
						{{ item }}
					</view>
				</view>
			</view>
			<view v-if="list.length == 1" class="content">
				<view :style="'line-height:'+height+'rpx;'" class="loopItemBaseShow">{{ list[0] }}</view>
			</view>
			<view v-if="showMore" class="offBox"><lwIcon :size="32" :color="moreColor" icon="arrowright"></lwIcon></view>
		</view>
	</view>
</template>

<script>
/*
lw-notice公告上下轮询组件（组件内依赖了自有的字体图标组件，可自行替换为uni或自身项目的图标组件）
color:字体颜色
backgroundColor:背景色
list:要循环的列表数据
height:组件高度
showScale:是否有缩放动画
runTime:间隔切换时间
showIcon:是否显示头部小喇叭
iconColor:小喇叭的颜色
showMore:是否显示尾部更多
moreColor:显示更多的颜色
*/
import lwIcon from './iconFont.vue'
export default {
	components:{lwIcon},
	props: {
		color: {
			type: String,
			default: '#Fb4747'
		},
		backgroundColor: {
			type: String,
			default: 'white'
		},
		list: {
			type: Array,
			default: []
		},
		height: {
			type: Number,
			default: 80
		},
		showScale: {
			type: Boolean,
			default: true
		},
		runTime:{
			type: Number,
			default: 4000
		},
		showIcon:{
			type: Boolean,
			default: true
		},
		showMore:{
			type: Boolean,
			default: false
		},
		iconColor:{
			type: String,
			default: 'red'
		},
		moreColor:{
			type: String,
			default: '#aaaaaa'
		}
	},
	data() {
		return {
			// 第一次展示
			firstIn:true,
			// 当前显示的项
			aindexArr:[],
			// 创建动画的实例
			animation:null,
			// 动画对象一
			animationData:null,
			// 动画对象二
			animationDataTwo:null,
			// 显示项和动画之间的映射关系
			indexLinkAnimationObj:{},
			setTimerOne:null,
			setTimerTwo:null,
			setTimerThree:null,
			setTimerFour:null,
			setTimerFive:null
		};
	},
	beforeDestroy() {
		this.resetPage()
	},
	computed:{
		// 计算展示项应该展示的动画
		realAnimation(){
			return function(value){
				if(this.indexLinkAnimationObj[value]){
					return this[this.indexLinkAnimationObj[value]]
				}else{
					return {}
				}
			}
		}
	},
	methods:{
		// 开始 按3000毫秒的运行示例图
		// 1.a显示 执行动画1 锁定动画1 0ms
		// 2.b显示 执行动画2 锁定动画2 200ms
		// 3.a隐藏 停止动画1 释放动画1 300ms
		// 4.c显示 执行动画1 锁定动画1 400ms
		// 5.b隐藏 停止动画2 释放动画2 500ms
		// 6.a显示 执行动画2 锁定动画2 600ms
		// 7.c隐藏 停止动画1 释放动画1 700ms
		// 8.b显示 执行动画1 锁定动画1 800ms
		// 9.a隐藏 停止动画2 释放动画2 900ms
		// 10.c显示 执行动画2 锁定动画2 1000ms
		initPage(){
			this.resetPage();
			if(this.list&&this.list.length){
				if(this.list.length>1){
					this.aindexArr.push(0);
					this.animation = uni.createAnimation({
						timingFunction: 'linear',
					})
					// #ifdef H5
					this.animationDataH5 = this.animation.translateY(-100).step({duration: 10000}).export()
					// #endif
					this.runAnimation(0,true);
				}
			}
		},
		// 重置页面动画
		resetPage(){
			// 移除所有定时器
			clearTimeout(this.setTimerOne);
			clearTimeout(this.setTimerTwo);
			clearTimeout(this.setTimerThree);
			clearTimeout(this.setTimerFour);
			clearTimeout(this.setTimerFive);
			// 重置页面属性
			this.aindexArr = [];
			this.animation = null;
			this.animationData = null;
			this.animationDataTwo = null;
			this.indexLinkAnimationObj = {};
		},
		// 执行动画方法(此方法内不要清除赋值的定时器)
		runAnimation(value,firstIn){
			let that = this;
			if(!firstIn){
				that.aindexArr.push(value);
			}
			// 获取执行动画对象
			let lockText = that.createAni(firstIn);
			// 延迟50毫秒执行(等待dom渲染)
			that.setTimerOne = setTimeout(()=>{
				// 创建执行动画和执行方之间的映射关系
				that.indexLinkAnimationObj[value] = lockText;
				// 获取基础执行时间单位
				let unitRunTime = (that.runTime-50)/6;
				let waitTime = firstIn?unitRunTime*4:unitRunTime*5;
				let waitTimeTwo = firstIn?(that.runTime-unitRunTime):that.runTime;
				// #ifdef H5
					waitTimeTwo = firstIn?(that.runTime-(1.5*unitRunTime)):that.runTime;
					//H5重新刷新一下动画绑定关系
					if(firstIn){
						that.aindexArr.splice(0,1);
						that.aindexArr.push(0);
					}
				// #endif
				
				// 开启下一个动画
				that.setTimerTwo = setTimeout(()=>{
					let Index = value == that.list.length - 1 ? 0 :value+1;
					that.runAnimation(Index)
				},waitTime)
				// 释放上一个执行方
				that.setTimerThree = setTimeout(()=>{
					let index = that.aindexArr.indexOf(value);
					that.aindexArr.splice(index,1)
					that.firstIn = false;
					delete that.indexLinkAnimationObj[value]
				},waitTimeTwo)
			},50)
		},
		// 创建动画方法
		createAni(firstIn){
			let that = this;
			let unitRunTime = (that.runTime-50)/6;
			
			let delayTime = unitRunTime*4;
			let durationTime = unitRunTime;
			let dispairTime = unitRunTime;
			// #ifdef H5
				delayTime = unitRunTime*3.5;
				dispairTime = unitRunTime*1.5;
			// #endif
			
			let showTransformHeight = - uni.upx2px(that.height);
			let hideTransformHeight = showTransformHeight*2;
			// 创建动画
			if(that.showScale){
				if(firstIn){
					// that.animation.translateY(1).scale(1,1).step({ duration: 5 });
					that.animation.translateY(showTransformHeight).scale(0.5,0.5).step({ delay: delayTime,duration: dispairTime});
				}else{
					that.animation.translateY(showTransformHeight).scale(1,1).step({ duration: durationTime });
					that.animation.translateY(hideTransformHeight).scale(0.5,0.5).step({ delay: delayTime,duration: dispairTime});
				}
			}else{
				if(firstIn){
					// that.animation.translateY(1).step({ duration: 5 });
					that.animation.translateY(showTransformHeight).step({ delay: delayTime,duration: dispairTime});
				}else{
					that.animation.translateY(showTransformHeight).step({ duration: durationTime });
					that.animation.translateY(hideTransformHeight).step({ delay: delayTime,duration: dispairTime});
				}
			}
			// 判断动画赋值项并赋值
			if(!that.animationData){
				that.animationData = that.animation.export()
				that.setTimerFour = setTimeout(()=>{
					clearTimeout(that.setTimerFour)
					that.animationData = false;
				},that.runTime)
				return 'animationData'
			}else{
				that.animationDataTwo = that.animation.export()
				that.setTimerFive = setTimeout(()=>{
					clearTimeout(that.setTimerFive)
					that.animationDataTwo = false;
				},that.runTime)
				return 'animationDataTwo'
			}
		},
		// 抛出点击事件
		toEmit(){
			let that = this
			if(that.list.length==1){
				that.$emit("itemClick",that.list[0])
			}else{
				that.$emit("itemClick",that.list[that.aindexArr[0]])
			}
		}
	},
	created(){
		
	},
	mounted() {
		// 判断list有值后开启动画
		// setTimeout()
		this.initPage()
	},
	watch:{
		list(value){
			this.initPage()
		}
	}
};
</script>

<style lang="scss" scoped>
.contentBox {
	width: 100%;
	display: flex;
	padding: 0 20rpx;
	align-items: center;
	box-sizing: border-box;
	.supBox {
		width: 50rpx;
		display: flex;
		justify-content: flex-start;
	}
	.offBox {
		width: 50rpx;
		display: flex;
		justify-content: flex-end;
	}
	.content {
		width: 100%;
		flex-grow: 1;
		height: 100%;
		display: flex;
		overflow: hidden;
		position: relative;
		align-items: center;
		box-sizing: border-box;
		justify-content: center;
		.loopItemBase{
			left: 0;
			top: 100%;
			width: 100%;
			height: 100%;
			overflow: hidden;
			font-size: 28rpx;
			text-align: left;
			position: absolute;
			white-space: nowrap;
			align-items: center;
			text-overflow: ellipsis;
			&.fistInClass{
				top:0;
			}
		}
		.loopItemBaseShow{
			top:0;
			left: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
			font-size: 28rpx;
			text-align: left;
			position: absolute;
			white-space: nowrap;
			align-items: center;
			text-overflow: ellipsis;
		}
	}
}
</style>
