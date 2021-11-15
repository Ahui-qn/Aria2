<template>
    <div>
        <Settings  
        @change="changeGlobalOption"
        :params="type"
        />
    </div>
</template>

<script>
import Settings from '../components/Settings.vue'
import {mapState, mapMutations, mapActions} from "vuex"

let basic = {
  "dir": "下载路径",
  "log": "日志文件",
  "max-concurrent-downloads": "最大同时下载数",
  "check-integrity": "检查完整性",
  "continue": "断点续传",
  "all-proxy": "代理服务器",
  "all-proxy-user": "代理服务器用户名",
  "all-proxy-passwd": "代理服务器密码",
  "connect-timeout": "连接超时时间",
  "dry-run": "模拟运行",
  "lowest-speed-limit": "最小速度限制",
  "max-connection-per-server": "单服务器最大连接数",
  "max-file-not-found": "文件未找到重试次数",
  "max-tries": "最大尝试次数",
  "min-split-size": "最小文件分片大小",
  "netrc-path": ".netrc 文件路径",
  "no-netrc": "禁用 netrc",
  "no-proxy": "不使用代理服务器列表",
  "proxy-method": "代理服务器请求方法",
  "remote-time": "获取服务器文件时间",
  "reuse-uri": "URI 复用",
  "retry-wait": "重试等待时间",
  "server-stat-of": "服务器状态保存文件",
  "server-stat-timeout": "服务器状态超时",
  "split": "单任务连接数",
  "stream-piece-selector": "分片选择算法",
}
let http = {

  "stream-piece-selector": "分片选择算法",
  "timeout": "超时时间",
  "uri-selector": "URI 选择算法",
  "check-certificate": "检查证书",
  "http-accept-gzip": "支持 GZip",
  "http-auth-challenge": "认证质询",
  "http-no-cache": "禁用缓存",
  "http-user": "HTTP 默认用户名",
  "http-passwd": "HTTP 默认密码",
  "http-proxy": "HTTP 代理服务器",
  "http-proxy-user": "HTTP 代理服务器用户名",
  "http-proxy-passwd": "HTTP 代理服务器密码",
  "https-proxy": "HTTPS 代理服务器",
  "https-proxy-user": "HTTPS 代理服务器用户名",
  "https-proxy-passwd": "HTTPS 代理服务器密码",
  "referer": "请求来源",
  "enable-http-keep-alive": "启用持久连接",
  "enable-http-pipelining": "启用 HTTP 管线化",
  "header": "自定义请求头",
  "save-cookies": "Cookies 保存路径",
  "use-head": "启用 HEAD 方法",
  "user-agent": "自定义 User Agent",
  "ftp-user": "FTP 默认用户名",
  "ftp-passwd": "FTP 默认密码",
  "ftp-pasv": "被动模式",
  "ftp-proxy": "FTP 代理服务器",
  "ftp-proxy-user": "FTP 代理服务器用户名",
  "ftp-proxy-passwd": "FTP 代理服务器密码",
  "ftp-type": "传输类型",
  "ftp-reuse-connection": "连接复用",
  "ssh-host-key-md": "SSH 公钥校验和",
  "bt-detach-seed-only": "分离仅做种任务",
  "bt-enable-hook-after-hash-check": "启用哈希检查完成事件",
}
let rpc = {
  "pause-metadata": "种子文件下载完后暂停",
  "rpc-allow-origin-all": "接受所有远程请求",
  "rpc-listen-all": "在所有网卡上监听",
  "rpc-listen-port": "监听端口",
  "rpc-max-request-size": "最大请求大小",
  "rpc-save-upload-metadata": "保存上传的种子文件",
  "rpc-secure": "启用 SSL/TLS",
  "allow-overwrite": "允许覆盖",
  "allow-piece-length-change": "允许分片大小变化",
  "always-resume": "始终断点续传",
  "async-dns": "异步 DNS",
  "auto-file-renaming": "文件自动重命名",
  "auto-save-interval": "自动保存间隔",
  "conditional-get": "条件下载",
  "conf-path": "配置文件路径",
  "console-log-level": "控制台日志级别",
  "content-disposition-default-utf8": "使用 UTF-8 处理 Content-Disposition",
  "daemon": "启用后台进程",
  "deferred-input": "延迟加载",
  "disable-ipv6": "禁用 IPv6",
}
let advanced = {
     "daemon": "启用后台进程",
  "deferred-input": "延迟加载",
  "disable-ipv6": "禁用 IPv6",
  "disk-cache": "磁盘缓存",
  "download-result": "下载结果",
  "dscp": "DSCP",
  "rlimit-nofile": "最多打开的文件描述符",
  "enable-color": "终端输出使用颜色",
  "enable-mmap": "启用 MMap",
  "event-poll": "事件轮询方法",
  "file-allocation": "文件分配方法",
  "force-save": "强制保存",
  "save-not-found": "保存未找到的文件",
  "hash-check-only": "仅哈希检查",
  "human-readable": "控制台可读输出",
  "keep-unfinished-download-result": "保留未完成的任务",
  "max-download-result": "最多下载结果",
  "max-mmap-limit": "MMap 最大限制",
  "max-resume-failure-tries": "最大断点续传尝试次数",
  "min-tls-version": "最低 TLS 版本",
  "log-level": "日志级别",
  "optimize-concurrent-downloads": "优化并发下载",
  "piece-length": "文件分片大小",
  "show-console-readout": "显示控制台输出",
  "summary-interval": "下载摘要输出间隔",
  "max-overall-download-limit": "全局最大下载速度",
  "max-download-limit": "最大下载速度",
  "no-conf": "禁用配置文件",
  "no-file-allocation-limit": "文件分配限制",
  "parameterized-uri": "启用参数化 URI 支持",
  "quiet": "禁用控制台输出",
  "realtime-chunk-checksum": "实时数据块验证",
  "remove-control-file": "删除控制文件",
  "save-session": "状态保存文件",
  "save-session-interval": "保存状态间隔",
  "socket-recv-buffer-size": "Socket 接收缓冲区大小",
  "stop": "自动关闭时间",
  "truncate-console-readout": "缩短控制台输出内容",
}

// 读取相同字段的不同值并存入
async function refresh(type, aria2) {    // 将获取到的新的设置项分别存入不同的设置字段， //dataField为data里的某个字段
    console.time('a')
    let latest = await aria2.getGlobalOption()
    let obj = {}
    for (let key1 in type) {
        for (let key2 in latest) {
            if (key1 == key2) {
                obj[key2] = latest[key2]
            }
        }
    }

    console.timeEnd('a')
    return obj
}
        
export default {
    name: 'Setting',
    components : {
        Settings,
    },
    data() {
        return {
            basic: basic,
            http: http,
            rpc: rpc,  
            advanced: advanced,
            type: null     // 分别为上面四个字段，再不同的route.params下不同
        }
    },
    computed : {
        ...mapState(['aria2']),
    },
    watch: {
        $route : {   // 当$route的params变化时触发返回不同的data字段
            handler() {
                let currentParams = this.$route.params.type
                if (currentParams == 'basic') {
                    this.type = this.basic
                }
                if (currentParams == 'http') {
                    this.type = this.http
                }
                if (currentParams == 'rpc') {
                    this.type = this.rpc
                }
                if (currentParams == 'advanced') {
                    this.type = this.advanced
                }
            }
        }
    },
    async  mounted() {
        this.basic = await refresh(this.basic, this.aria2)
        this.http = await refresh(this.http, this.aria2)
        this.rpc = await refresh(this.rpc, this.aria2)
        this.advanced = await refresh(this.advanced, this.aria2)
        this.type = this.basic
    },
    
    methods : {
        async changeGlobalOption(value) {
            // let val = JSON.stringify(value)
            await this.aria2.changeGlobalOption({"max-concurrent-downloads" : "3"})
            // let a = await this.aria2.getGlobalOption()
            // console.log('OK', a)
            // 有些选项是修改不成功的，所以重新从服务器加载一次最新的配置项
        },
    }
    // 
    // 将分类好类的四个设置对象分别保存在data四个字段
    // 分别给不同的route传递不同四个对象，再把翻译也传过去
    // 子组件修改了参数，就给父组件提交接口来更新设置，editSetting接收传来的设置项参数，然后传给changeGlobaOption去修改
    // 直接把传来的设置参数传给changeglobalOptions即可修改
}
</script>