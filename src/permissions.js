module.exports = [
    {
        "id": "-1",
        "title": "首页",
        "meta": {
            "icon": null,
            "url": ""
        },
        "parentId": "",
        "hasParent":false,
        "hasChildren":true,
        "children":[
            {
                "id": "0",
                "title": "首页",
                "meta": {
                    "icon": null,
                    "url": "home"
                },
                "parentId": "-1",
                "hasParent":true,
                "hasChildren":false
            },
        ]
    },
    {
        "id": "2",
        "title": "投放管理",
        "state": null,
        "checked": false,
        "meta": {
            "icon": null,
            "url": "/tz_manage"
        },
        "parentId": "-1",
        "hasParent": false,
        "hasChildren": true,
        "children": [
            {
                "id": "3",
                "title": "数据报告",
                "state": null,
                "checked": false,
                "meta": {
                    "icon": null,
                    "url": "data_report"
                },
                "children": [],
                "parentId": "2",
                "hasParent": true,
                "hasChildren": false
            }
        ]
    },
    {
        "id": "4",
        "title": "财务管理",
        "state": null,
        "checked": false,
        "meta": {
            "icon": null,
            "url": "/cw_manage"
        },
        "parentId": "-1",
        "hasParent": false,
        "hasChildren": true,
        "children": [
            {
                "id": "5",
                "title": "充值记录",
                "state": null,
                "checked": false,
                "meta": {
                    "icon": null,
                    "url": "recharge_record"
                },
                "parentId": "4",
                "hasParent": true,
                "hasChildren": false
            },
            {
                "id": "6",
                "title": "消耗记录",
                "state": null,
                "checked": false,
                "meta": {
                    "icon": null,
                    "url": "consume_record"
                },
                "parentId": "4",
                "hasParent": true,
                "hasChildren": false
            }
        ]
    },
    {
        "id": "9",
        "title": "消息中心",
        "state": null,
        "checked": false,
        "meta": {
            "icon": null,
            "url": "/message"
        },
        "parentId": "-1",
        "hasParent": false,
        "hasChildren": true,
        "children": [
            {
                "id": "10",
                "title": "消息中心",
                "state": null,
                "checked": false,
                "meta": {
                    "icon": null,
                    "url": "msg_list"
                },
                "parentId": "9",
                "hasParent": true,
                "hasChildren": false
            }
        ]
    },
    {
        "id": "7",
        "title": "用户管理",
        "state": null,
        "checked": false,
        "meta": {
            "icon": null,
            "url": "/user_manage"
        },
        "parentId": "-1",
        "hasParent": false,
        "hasChildren": true,
        "children": [
            {
                "id": "8",
                "title": "用户管理",
                "state": null,
                "checked": false,
                "meta": {
                    "icon": null,
                    "url": "index"
                },
                "parentId": "7",
                "hasParent": true,
                "hasChildren": false
            }
        ]
    }
]