Page({
    data: {
        list2: [
            {
                id: 'form',
                name: '表单',
                open: false,
                pages: ['button', 'list2', 'input', 'slider', 'uploader']
            },
            {
                id: 'widget',
                name: '基础组件',
                open: false,
                pages: ['article', 'badge', 'flex', 'footer', 'gallery', 'grid', 'icons', 'loadmore', 'panel', 'preview', 'progress']
            },
            {
                id: 'feedback',
                name: '操作反馈',
                open: false,
                pages: ['actionsheet', 'dialog', 'msg', 'picker', 'toast']
            },
            {
                id: 'nav',
                name: '导航相关',
                open: false,
                pages: ['navbar', 'tabbar']
            },
            {
                id: 'search',
                name: '搜索相关',
                open: false,
                pages: ['searchbar']
            }
        ]
    },
    kindToggle: function (e) {
        var id = e.currentTarget.id, list2 = this.data.list2;
        for (var i = 0, len = list2.length; i < len; ++i) {
            if (list2[i].id == id) {
                list2[i].open = !list2[i].open
            } else {
                list2[i].open = false
            }
        }
        this.setData({
            list2: list2
        });
    }
});
