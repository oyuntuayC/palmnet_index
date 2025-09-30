#!/bin/bash

# =============== 配置区 ===============
LOCAL_DIR="./out"                              # 本地要同步的目录
REMOTE_USER="root"                              # 服务器用户名
REMOTE_HOST="8.211.35.238"                      # 服务器 IP
REMOTE_DIR="/www/wwwroot/www.palmnet.co"        # 宝塔网站目录
EXCLUDE_FILE=".rsyncignore"              # 排除文件列表
RSYNC_OPTIONS="-avz --delete"         # 先 dry-run，确认无误后去掉 --dry-run
DEBOUNCE_TIME=2 
# ====================================

if [ ! -f "$EXCLUDE_FILE" ]; then
    echo "⚠️ 排除文件 $EXCLUDE_FILE 不存在，将不排除任何文件"
    EXCLUDE_PARAM=""
else
    EXCLUDE_PARAM="--exclude-from=$EXCLUDE_FILE"
fi

echo "📡 正在监听 $LOCAL_DIR ... 变化即自动同步到 $REMOTE_HOST:$REMOTE_DIR"
echo "⏳ 防抖时间：$DEBOUNCE_TIME 秒"

# 用变量记录上次同步时间
LAST_SYNC=0

fswatch -o "$LOCAL_DIR" | while read f
do
    NOW=$(date +%s)
    if (( NOW - LAST_SYNC < DEBOUNCE_TIME )); then
        # 如果距离上次同步小于防抖时间，就跳过
        continue
    fi
    LAST_SYNC=$NOW

    echo "🔄 检测到变化，等待 $DEBOUNCE_TIME 秒防抖..."
    sleep $DEBOUNCE_TIME

    echo "🚀 开始同步..."
    rsync $RSYNC_OPTIONS $EXCLUDE_PARAM "$LOCAL_DIR"/ "$REMOTE_USER"@"$REMOTE_HOST":"$REMOTE_DIR"/
    if [ $? -eq 0 ]; then
        echo "✅ 同步完成 $(date)"
    else
        echo "❌ 同步失败，请检查网络/SSH连接"
    fi
done