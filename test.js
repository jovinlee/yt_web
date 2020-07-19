//将以下代码粘贴到web-admin-web下的src/router/index.js中
{
    path: 'album',
        name
:
    'album',
        component
:
    () =
>
    import('@/views/pms/album/index'),
        meta
:
    {
        title: '相册表列表}'
    }
}
,
{
    path: 'addAlbum',
        name
:
    'addAlbum',
        component
:
    () =
>
    import('@/views/pms/album/add'),
        meta
:
    {
        title: '添加相册表', icon
    :
        'album-add'
    }
}
,
{
    path: 'updateAlbum',
        name
:
    'updateAlbum',
        component
:
    () =
>
    import('@/views/pms/album/update'),
        meta
:
    {
        title: '修改相册表', icon
    :
        'album-update'
    }
,
    hidden: true
}
,
