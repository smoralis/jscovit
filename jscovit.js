// ==PREPROCESSOR==
// @name "JSCovit"
// @author "zeremy"
// @version "0.2 2023-08-13"
// @import "%fb2k_component_path%helpers.txt"
// ==/PREPROCESSOR==

// Frontend for COVIT
// https://covers.musichoarders.xyz/

// for foobar2000
// with JScript Panel 3
// https://github.com/jscript-panel/release


var fso = new ActiveXObject('Scripting.FileSystemObject');

var tfo1 = fb.TitleFormat("[%album artist%]");
var tfo2 = fb.TitleFormat("[%album%]");
var tfo3 = fb.TitleFormat("[$directory_path(%path%)]");
var handle_list;

var artist;
var album;
var folderpath;
var filename;

var counter = 0;
var tasks = [];
var debug = window.GetProperty('COVIT.DEBUG', false);

var covit_address = ['covers.musichoarders.xyz'];
var address = window.GetProperty('COVIT.ADDRESS', 0);
var names = ['cover', 'front'];
var name = window.GetProperty('COVIT.NAME', 0);
var browsers = ['default', 'firefox', 'edge', 'chrome', 'safari'];
var browser = window.GetProperty('COVIT.BROWSER', 0);
var countries = ['(Disable Override)', 'au', 'ca', 'cn', 'fr', 'de', 'in', 'it', 'jp', 'kr', 'es', 'tw', 'gb', 'us'];
var country = window.GetProperty('COVIT.COUNTRY', 0);
var resolutions = ['(Disable Override)', 500, 1000, 1500, 2000, 2500, 3000];
var resolution = window.GetProperty('COVIT.RESOLUTION', 0);
var psourcesarr = [];
var sources_limit = 14;
var sources = ['applemusic', 'itunes', 'musicbrainz', 'deezer', 'kkbox', 'amazonmusic', 'vgmdb', 'bandcamp', 'gracenote', 'soundcloud', 'amazon', 'bugs', 'flo', 'tidal', 'linemusic', 'recochoku', 'netease', 'kugou', 'ototoy', 'soulseek', 'metalarchives', 'gaana', 'discogs', 'spotify', 'qobuz', 'fanarttv', 'lastfm', 'melon', 'beatport'];
var sources_names = ['Apple Music', 'iTunes', 'MusicBrainz', 'Deezer', 'KKBOX', 'Amazon Music', 'VGMdb', 'Bandcamp', 'Gracenote', 'SoundCloud', 'Amazon', 'Bugs', 'FLO', 'TIDAL', 'LINE MUSIC', 'RecoChoku', 'NetEase', 'KuGou', 'OTOTOY', 'Soulseek', 'Metal Archives', 'Gaana', 'Discogs', 'Spotify', 'Qobuz', 'Fanart.tv', 'Last.fm', 'Melon', 'BeatPort'];
var sources_enabled_0 = window.GetProperty('COVIT.SOURCES_ENABLED_00_applemusic', false); //applemusic
var sources_enabled_1 = window.GetProperty('COVIT.SOURCES_ENABLED_01_itunes', false); //itunes
var sources_enabled_2 = window.GetProperty('COVIT.SOURCES_ENABLED_02_musicbrainz', false); //musicbrainz
var sources_enabled_3 = window.GetProperty('COVIT.SOURCES_ENABLED_03_deezer', false); //deezer
var sources_enabled_4 = window.GetProperty('COVIT.SOURCES_ENABLED_04_kkbox', false); //kkbox
var sources_enabled_5 = window.GetProperty('COVIT.SOURCES_ENABLED_05_amazonmusic', false); //amazonmusic
var sources_enabled_6 = window.GetProperty('COVIT.SOURCES_ENABLED_06_vgmdb', false); //vgmdb
var sources_enabled_7 = window.GetProperty('COVIT.SOURCES_ENABLED_07_bandcamp', false); //bandcamp
var sources_enabled_8 = window.GetProperty('COVIT.SOURCES_ENABLED_08_gracenote', false); //gracenote
var sources_enabled_9 = window.GetProperty('COVIT.SOURCES_ENABLED_09_soundcloud', false); //soundcloud
var sources_enabled_10 = window.GetProperty('COVIT.SOURCES_ENABLED_10_amazon', false); //amazon
var sources_enabled_11 = window.GetProperty('COVIT.SOURCES_ENABLED_11_bugs', false); //bugs
var sources_enabled_12 = window.GetProperty('COVIT.SOURCES_ENABLED_12_flo', false); //flo
var sources_enabled_13 = window.GetProperty('COVIT.SOURCES_ENABLED_13_tidal', false); //tidal
var sources_enabled_14 = window.GetProperty('COVIT.SOURCES_ENABLED_14_linemusic', false); //linemusic
var sources_enabled_15 = window.GetProperty('COVIT.SOURCES_ENABLED_15_recochoku', false); //recochoku
var sources_enabled_16 = window.GetProperty('COVIT.SOURCES_ENABLED_16_netease', false); //netease
var sources_enabled_17 = window.GetProperty('COVIT.SOURCES_ENABLED_17_kugou', false); //kugou
var sources_enabled_18 = window.GetProperty('COVIT.SOURCES_ENABLED_18_ototoy', false); //ototoy
var sources_enabled_19 = window.GetProperty('COVIT.SOURCES_ENABLED_19_soulseek', false); //soulseek
var sources_enabled_20 = window.GetProperty('COVIT.SOURCES_ENABLED_20_metalarchives', false); //metalarchives
var sources_enabled_21 = window.GetProperty('COVIT.SOURCES_ENABLED_21_gaana', false); //gaana
var sources_enabled_22 = window.GetProperty('COVIT.SOURCES_ENABLED_22_discogs', false); //discogs
var sources_enabled_23 = window.GetProperty('COVIT.SOURCES_ENABLED_23_spotify', false); //spotify
var sources_enabled_24 = window.GetProperty('COVIT.SOURCES_ENABLED_24_qobuz', false); //qobuz
var sources_enabled_25 = window.GetProperty('COVIT.SOURCES_ENABLED_25_fanarttv', false); //fanarttv
var sources_enabled_26 = window.GetProperty('COVIT.SOURCES_ENABLED_26_lastfm', false); //lastfm
var sources_enabled_27 = window.GetProperty('COVIT.SOURCES_ENABLED_27_melon', false); //melon
var sources_enabled_28 = window.GetProperty('COVIT.SOURCES_ENABLED_28_beatport', false); //beatport
var sources_use = window.GetProperty('COVIT.SOURCES_USE', false);
var infobar = window.GetProperty('COVIT.INFOBAR', true);
var remove_embedded = window.GetProperty('COVIT.REMOVE_EMBED', false);
var add_embedded = window.GetProperty('COVIT.ADD_EMBED', false);

var covit_dir = fb.ProfilePath + 'user-data\\covit';
utils.CreateFolder(covit_dir);

var covit_images = fb.ProfilePath + 'user-data\\covit\\images';
utils.CreateFolder(covit_images);

var covit_bin = fb.ProfilePath + 'user-data\\covit\\covit-windows-amd64.exe';
if (!utils.IsFile(covit_bin))
    utils.DownloadFileAsync(window.ID, 'https://covers.musichoarders.xyz/share/covit-windows-amd64.exe', covit_bin);

function on_download_file_done(path, success, error_text) {
    console.log(path + " " + success + " " + error_text);
}

var g_img = null;
var g_metadb = null;
var g_tooltip = window.CreateTooltip('Segoe UI', 15);
g_tooltip.SetMaxWidth(600);
g_tooltip.Text = '';
var g_info = '';
var ww = 0, wh = 0;
var font_segoe_ui = CreateFontString("Segoe UI", 10);
var is_embedded = false;

function _mymenu(x, y, flags) {
    var menu = window.CreatePopupMenu();
    var s1 = window.CreatePopupMenu();
    var s2 = window.CreatePopupMenu();
    var s3 = window.CreatePopupMenu();
    var s4 = window.CreatePopupMenu();
    var s5 = window.CreatePopupMenu();
    menu.AppendMenuItem(MF_GRAYED, 1000, 'JSCovit Intergration');
    menu.AppendMenuSeparator();
    if (artist && album && folderpath) {
        menu.AppendMenuItem(MF_STRING, 1001, 'Search for :  ' + artist + ' - ' + album);
        menu.AppendMenuItem(MF_GRAYED, 1001, 'Primary (Albums/Create file): ' + filename + '.$ext');
        menu.AppendMenuItem(MF_GRAYED, 1001, 'Secondary (Singletons/Embed artwork to file)');
    } else
        menu.AppendMenuItem(MF_DISABLED, 1003, 'Search disabled (No artist - album found and/or invalid selection)');
    menu.AppendMenuSeparator();
    menu.AppendMenuItem(MF_STRING, 1004, 'Primary: Remove embedded cover if it exists');
    menu.CheckMenuItem(1004, remove_embedded);
    menu.AppendMenuItem(MF_STRING, 1005, 'Primary: Add embedded cover to items (not recommended)');
    menu.CheckMenuItem(1005, add_embedded);
    menu.AppendMenuSeparator();
    menu.AppendMenuItem(MF_DISABLED, 1500, 'Covit Parameters');
    s1.AppendTo(menu, MF_STRING, 'Filename');
    s1.AppendMenuItem(MF_STRING, 1510, names[0]);
    s1.AppendMenuItem(MF_STRING, 1511, names[1]);
    s1.CheckMenuRadioItem(1510, 1511, name + 1510);
    s2.AppendTo(menu, MF_STRING, 'Browser');
    s2.AppendMenuItem(MF_STRING, 1520, browsers[0]);
    s2.AppendMenuItem(MF_STRING, 1521, browsers[1]);
    s2.AppendMenuItem(MF_STRING, 1522, browsers[2]);
    s2.AppendMenuItem(MF_STRING, 1523, browsers[3]);
    s2.AppendMenuItem(MF_STRING, 1524, browsers[4]);
    s2.CheckMenuRadioItem(1520, 1524, browser + 1520);
    menu.AppendMenuSeparator();
    menu.AppendMenuItem(MF_DISABLED, 2000, 'Covit Overrides');
    s3.AppendTo(menu, MF_STRING, 'Country');
    s3.AppendMenuItem(MF_STRING, 1550, '(Disable)');
    s3.AppendMenuItem(MF_STRING, 1551, 'Australia');
    s3.AppendMenuItem(MF_STRING, 1552, 'Canada');
    s3.AppendMenuItem(MF_STRING, 1553, 'China');
    s3.AppendMenuItem(MF_STRING, 1554, 'France');
    s3.AppendMenuItem(MF_STRING, 1555, 'Germany');
    s3.AppendMenuItem(MF_STRING, 1556, 'India');
    s3.AppendMenuItem(MF_STRING, 1557, 'Italy');
    s3.AppendMenuItem(MF_STRING, 1558, 'Japan');
    s3.AppendMenuItem(MF_STRING, 1559, 'Korea');
    s3.AppendMenuItem(MF_STRING, 1560, 'Spain');
    s3.AppendMenuItem(MF_STRING, 1561, 'Taiwan');
    s3.AppendMenuItem(MF_STRING, 1562, 'United Kingdom');
    s3.AppendMenuItem(MF_STRING, 1563, 'United States');
    s3.CheckMenuRadioItem(1550, 1563, country + 1550);
    s4.AppendTo(menu, MF_STRING, 'Resolution');
    s4.AppendMenuItem(MF_STRING, 1570, '(Disable)');
    s4.AppendMenuItem(MF_STRING, 1571, '500');
    s4.AppendMenuItem(MF_STRING, 1572, '1000');
    s4.AppendMenuItem(MF_STRING, 1573, '1500');
    s4.AppendMenuItem(MF_STRING, 1574, '2000');
    s4.AppendMenuItem(MF_STRING, 1575, '2500');
    s4.AppendMenuItem(MF_STRING, 1576, '3000');
    s4.CheckMenuRadioItem(1570, 1576, resolution + 1570);
    s5.AppendTo(menu, MF_STRING, 'Sources');
    s5.AppendMenuItem(MF_STRING, 1999, "Enable Sources Overrides (Selected " + psourcesarr.length + " / Max allowed " + sources_limit + ")");
    s5.CheckMenuItem(1999, sources_use);
    s5.AppendMenuSeparator();
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2000, sources_names[0]);
    s5.CheckMenuItem(2000, sources_enabled_0);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2001, sources_names[1]);
    s5.CheckMenuItem(2001, sources_enabled_1);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2002, sources_names[2]);
    s5.CheckMenuItem(2002, sources_enabled_2);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2003, sources_names[3]);
    s5.CheckMenuItem(2003, sources_enabled_3);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2004, sources_names[4]);
    s5.CheckMenuItem(2004, sources_enabled_4);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2005, sources_names[5]);
    s5.CheckMenuItem(2005, sources_enabled_5);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2006, sources_names[6]);
    s5.CheckMenuItem(2006, sources_enabled_6);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2007, sources_names[7]);
    s5.CheckMenuItem(2007, sources_enabled_7);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2008, sources_names[8]);
    s5.CheckMenuItem(2008, sources_enabled_8);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2009, sources_names[9]);
    s5.CheckMenuItem(2009, sources_enabled_9);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2010, sources_names[10]);
    s5.CheckMenuItem(2010, sources_enabled_10);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2011, sources_names[11]);
    s5.CheckMenuItem(2011, sources_enabled_11);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2012, sources_names[12]);
    s5.CheckMenuItem(2012, sources_enabled_12);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2013, sources_names[13]);
    s5.CheckMenuItem(2013, sources_enabled_13);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2014, sources_names[14]);
    s5.CheckMenuItem(2014, sources_enabled_14);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2015, sources_names[15]);
    s5.CheckMenuItem(2015, sources_enabled_15);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2016, sources_names[16]);
    s5.CheckMenuItem(2016, sources_enabled_16);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2017, sources_names[17]);
    s5.CheckMenuItem(2017, sources_enabled_17);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2018, sources_names[18]);
    s5.CheckMenuItem(2018, sources_enabled_18);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2019, sources_names[19]);
    s5.CheckMenuItem(2019, sources_enabled_19);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2020, sources_names[20]);
    s5.CheckMenuItem(2020, sources_enabled_20);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2021, sources_names[21]);
    s5.CheckMenuItem(2021, sources_enabled_21);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2022, sources_names[22]);
    s5.CheckMenuItem(2022, sources_enabled_22);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2023, sources_names[23]);
    s5.CheckMenuItem(2023, sources_enabled_23);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2024, sources_names[24]);
    s5.CheckMenuItem(2024, sources_enabled_24);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2025, sources_names[25]);
    s5.CheckMenuItem(2025, sources_enabled_25);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2026, sources_names[26]);
    s5.CheckMenuItem(2026, sources_enabled_26);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2027, sources_names[27]);
    s5.CheckMenuItem(2027, sources_enabled_27);
    s5.AppendMenuItem(sources_use ? MF_STRING : MF_GRAYED, 2028, sources_names[28]);
    s5.CheckMenuItem(2028, sources_enabled_28);
    menu.AppendMenuSeparator();
    menu.AppendMenuItem(MF_STRING, 4000, 'Show infobar');
    menu.CheckMenuItem(4000, infobar);
    menu.AppendMenuItem(MF_STRING, 4001, 'View image in fb2k picture viewer');
    menu.AppendMenuItem(utils.IsFolder(folderpath) ? MF_STRING : MF_GRAYED, 4002, 'Open containing folder');
    menu.AppendMenuSeparator();
    menu.AppendMenuItem(MF_STRING, 4003, 'Show debug info in console');
    menu.CheckMenuItem(4003, debug);
    menu.AppendMenuSeparator();
    menu.AppendMenuItem(MF_STRING, 5000, 'Exit menu');

    var idx = menu.TrackPopupMenu(x, y, flags);
    switch (idx) {
    case 1001:
        covit_search();
        break;
    case 1004:
        remove_embedded = !remove_embedded;
        window.SetProperty('COVIT.REMOVE_EMBED', remove_embedded);
        break;
    case 1005:
        add_embedded = !add_embedded;
        window.SetProperty('COVIT.ADD_EMBED', add_embedded);
        break;
    case 1510:
    case 1511:
        name = idx - 1510;
        window.SetProperty('COVIT.NAME', name);
        get_filename();
        break;
    case 1520:
    case 1521:
    case 1522:
    case 1523:
    case 1524:
        browser = idx - 1520;
        window.SetProperty('COVIT.BROWSER', browser);
        break;
    case 1550:
    case 1551:
    case 1552:
    case 1553:
    case 1554:
    case 1555:
    case 1556:
    case 1557:
    case 1558:
    case 1559:
    case 1560:
    case 1561:
    case 1562:
    case 1563:
        country = idx - 1550;
        window.SetProperty('COVIT.COUNTRY', country);
        break;
    case 1570:
    case 1571:
    case 1572:
    case 1573:
    case 1574:
    case 1575:
    case 1576:
        resolution = idx - 1570;
        window.SetProperty('COVIT.RESOLUTION', resolution);
        break;
    case 1999:
        sources_use = !sources_use;
        window.SetProperty('COVIT.SOURCES_USE', sources_use);
        break;
    case 2000:
        sources_enabled_0 = !sources_enabled_0;
        window.SetProperty('COVIT.SOURCES_ENABLED_00_applemusic', sources_enabled_0);
        get_sources_list();
        break;
    case 2001:
        sources_enabled_1 = !sources_enabled_1;
        window.SetProperty('COVIT.SOURCES_ENABLED_01_itunes', sources_enabled_1);
        get_sources_list();
        break;
    case 2002:
        sources_enabled_2 = !sources_enabled_2;
        window.SetProperty('COVIT.SOURCES_ENABLED_02_musicbrainz', sources_enabled_2);
        get_sources_list();
        break;
    case 2003:
        sources_enabled_3 = !sources_enabled_3;
        window.SetProperty('COVIT.SOURCES_ENABLED_03_deezer', sources_enabled_3);
        get_sources_list();
        break;
    case 2004:
        sources_enabled_4 = !sources_enabled_4;
        window.SetProperty('COVIT.SOURCES_ENABLED_04_kkbox', sources_enabled_4);
        get_sources_list();
        break;
    case 2005:
        sources_enabled_5 = !sources_enabled_5;
        window.SetProperty('COVIT.SOURCES_ENABLED_05_amazonmusic', sources_enabled_5);
        get_sources_list();
        break;
    case 2006:
        sources_enabled_6 = !sources_enabled_6;
        window.SetProperty('COVIT.SOURCES_ENABLED_06_vgmdb', sources_enabled_6);
        get_sources_list();
        break;
    case 2007:
        sources_enabled_7 = !sources_enabled_7;
        window.SetProperty('COVIT.SOURCES_ENABLED_07_bandcamp', sources_enabled_7);
        get_sources_list();
        break;
    case 2008:
        sources_enabled_8 = !sources_enabled_8;
        window.SetProperty('COVIT.SOURCES_ENABLED_08_gracenote', sources_enabled_8);
        get_sources_list();
        break;
    case 2009:
        sources_enabled_9 = !sources_enabled_9;
        window.SetProperty('COVIT.SOURCES_ENABLED_09_soundcloud', sources_enabled_9);
        get_sources_list();
        break;
    case 2010:
        sources_enabled_10 = !sources_enabled_10;
        window.SetProperty('COVIT.SOURCES_ENABLED_10_amazon', sources_enabled_10);
        get_sources_list();
        break;
    case 2011:
        sources_enabled_11 = !sources_enabled_11;
        window.SetProperty('COVIT.SOURCES_ENABLED_11_bugs', sources_enabled_11);
        get_sources_list();
        break;
    case 2012:
        sources_enabled_12 = !sources_enabled_12;
        window.SetProperty('COVIT.SOURCES_ENABLED_12_flo', sources_enabled_12);
        get_sources_list();
        break;
    case 2013:
        sources_enabled_13 = !sources_enabled_13;
        window.SetProperty('COVIT.SOURCES_ENABLED_13_tidal', sources_enabled_13);
        get_sources_list();
        break;
    case 2014:
        sources_enabled_14 = !sources_enabled_14;
        window.SetProperty('COVIT.SOURCES_ENABLED_14_linemusic', sources_enabled_14);
        get_sources_list();
        break;
    case 2015:
        sources_enabled_15 = !sources_enabled_15;
        window.SetProperty('COVIT.SOURCES_ENABLED_15_recochoku', sources_enabled_15);
        get_sources_list();
        break;
    case 2016:
        sources_enabled_16 = !sources_enabled_16;
        window.SetProperty('COVIT.SOURCES_ENABLED_16_netease', sources_enabled_16);
        get_sources_list();
        break;
    case 2017:
        sources_enabled_17 = !sources_enabled_17;
        window.SetProperty('COVIT.SOURCES_ENABLED_17_kugou', sources_enabled_17);
        get_sources_list();
        break;
    case 2018:
        sources_enabled_18 = !sources_enabled_18;
        window.SetProperty('COVIT.SOURCES_ENABLED_18_ototoy', sources_enabled_18);
        get_sources_list();
        break;
    case 2019:
        sources_enabled_19 = !sources_enabled_19;
        window.SetProperty('COVIT.SOURCES_ENABLED_19_soulseek', sources_enabled_19);
        get_sources_list();
        break;
    case 2020:
        sources_enabled_20 = !sources_enabled_20;
        window.SetProperty('COVIT.SOURCES_ENABLED_20_metalarchives', sources_enabled_20);
        get_sources_list();
        break;
    case 2021:
        sources_enabled_21 = !sources_enabled_21;
        window.SetProperty('COVIT.SOURCES_ENABLED_21_gaana', sources_enabled_21);
        get_sources_list();
        break;
    case 2022:
        sources_enabled_22 = !sources_enabled_22;
        window.SetProperty('COVIT.SOURCES_ENABLED_22_discogs', sources_enabled_22);
        get_sources_list();
        break;
    case 2023:
        sources_enabled_23 = !sources_enabled_23;
        window.SetProperty('COVIT.SOURCES_ENABLED_23_spotify', sources_enabled_23);
        get_sources_list();
        break;
    case 2024:
        sources_enabled_24 = !sources_enabled_24;
        window.SetProperty('COVIT.SOURCES_ENABLED_24_qobuz', sources_enabled_24);
        get_sources_list();
        break;
    case 2025:
        sources_enabled_25 = !sources_enabled_25;
        window.SetProperty('COVIT.SOURCES_ENABLED_25_fanarttv', sources_enabled_25);
        get_sources_list();
        break;
    case 2026:
        sources_enabled_26 = !sources_enabled_26;
        window.SetProperty('COVIT.SOURCES_ENABLED_26_lastfm', sources_enabled_26);
        get_sources_list();
        break;
    case 2027:
        sources_enabled_27 = !sources_enabled_27;
        window.SetProperty('COVIT.SOURCES_ENABLED_27_melon', sources_enabled_27);
        get_sources_list();
        break;
    case 2028:
        sources_enabled_28 = !sources_enabled_28;
        window.SetProperty('COVIT.SOURCES_ENABLED_28_beatport', sources_enabled_28);
        get_sources_list();
        break;
    case 4000:
        infobar = !infobar;
        window.SetProperty('COVIT.INFOBAR', infobar);
        window.Repaint();
        break;
    case 4001:
        if (g_metadb)
            g_metadb.ShowAlbumArtViewer(0);
        break;
    case 4002:
        utils.Run(folderpath);
        break;
    case 4003:
        debug = !debug;
        window.SetProperty('COVIT.DEBUG', infobar);
        break;
    case 5000:
        break;
    }
    menu.Dispose();
}

function get_selection() {
    artist = '';
    album = '';
    folderpath = '';
    filename = '';
    g_metadb = null;

    handle_list = fb.GetSelection();

    if (handle_list.Count > 0) {
        var artists = tfo1.EvalWithMetadbs(handle_list).toArray();
        var albums = tfo2.EvalWithMetadbs(handle_list).toArray();
        var folderpaths = tfo3.EvalWithMetadbs(handle_list).toArray();

        if (checkArrayEqualElements(artists))
            artist = artists[0];
        if (checkArrayEqualElements(albums))
            album = albums[0];
        if (checkArrayEqualElements(folderpaths))
            folderpath = folderpaths[0];

        if (artist && album && folderpath)
            get_filename();

        if (debug) {
            console.log("Artist: " + (artist ? artist : 'Invalid Selection'));
            console.log("Album: " + (album ? album : 'Invalid Selection'));
            console.log("Folder: " + (folderpath ? folderpath : 'Invalid Selection'));
            console.log("Filename: " + (filename ? filename : 'N/A'));
            console.log("Selected items: " + handle_list.Count);
        }

    }

}

function on_playlist_items_selection_change() {
    //get_selection();
    //update_album_art();
}

function on_playlist_items_added() {
    get_selection();
    update_album_art();
}

function on_playlist_items_removed() {
    get_selection();
    update_album_art();
}

function on_playlist_switch() {
    get_selection();
    update_album_art();
}

function on_item_focus_change() {
    get_selection();
    update_album_art();
}

function on_metadb_changed() {
    get_selection();
    update_album_art();
}

get_selection();
update_album_art();
get_sources_list();

function update_album_art() {
    if (g_img)
        g_img.Dispose();
    g_img = null;
    g_info = '';
    g_tooltip.Text = '';
    if (handle_list.Count > 0) {
        g_metadb = fb.IsPlaying ? fb.GetNowPlaying() : handle_list.GetItem(0);
    } else
        g_metadb = null;
    if (g_metadb) {
        g_img = g_metadb.GetAlbumArt();
        if (g_img) {
            var path = g_img.Path;
            g_info = 'Original dimensions: ' + g_img.Width + 'x' + g_img.Height;
            is_embedded = g_img.Path == g_metadb.Path;
            g_info += (is_embedded ? '\nType: Embedded' : ((g_img.Path.match("^https?:\\/\\/.+\\.(jpg|jpeg|png|webp|avif|gif|svg)$")) ? '\nType: URL' : '\nType: File'));
            if (path.length)
                g_info += '\nPath: ' + path;
        }
    }
    window.Repaint();
}

function get_filename() {
    filename = folderpath + '\\' + names[name];
}

function on_colours_changed() {
    window.Repaint();
}

function on_mouse_lbtn_up(x, y, mask) {
    _mymenu(x, y);
}

function on_mouse_move(x, y) {
    if (g_info.length && g_tooltip.Text != g_info) {
        g_tooltip.Text = g_info;
        g_tooltip.Activate();
    }
}

function on_paint(gr) {
    var bg = window.IsDefaultUI ? window.GetColourDUI(1) : window.GetColourCUI(3);
    var text_colour = window.IsDefaultUI ? window.GetColourDUI(0) : window.GetColourCUI(0);
    gr.FillRectangle(0, 0, ww, wh, bg);
    if (g_img) {
        var scale_w = ww / g_img.Width;
        var scale_h = wh / g_img.Height;
        var scale = Math.min(scale_w, scale_h);
        var pos_x = 0,
        pos_y = 0;
        if (scale_w < scale_h)
            pos_y = (wh - g_img.height * scale) / 2;
        else if (scale_w > scale_h)
            pos_x = (ww - g_img.Width * scale) / 2;
        gr.DrawImage(g_img, pos_x, pos_y, g_img.Width * scale, g_img.Height * scale, 0, 0, g_img.Width, g_img.Height);

    }
    if (infobar) {
        gr.FillRectangle(0, wh - 30, ww, 30, bg);
        if (g_img)
            var img_info = g_img.Width + 'x' + g_img.Height + ' | ' + (is_embedded ? ' Embedded | n/a' : ((g_img.Path.match("^https?:\\/\\/.+\\.(jpg|jpeg|png|webp|avif|gif|svg)$")) ? ' URL | ' + g_img.Path.split('/').pop() : 'File | ' + g_img.Path.split('\\').pop()) + ' | ' + bytesToSize(utils.GetFileSize(g_img.Path)));
        var info = ' JSCovit | ' + (img_info ? img_info : 'No Artwork') + ' | ' + handle_list.Count + ' item(s)';
        gr.WriteText(info, font_segoe_ui, text_colour, 0, wh - 30, ww, 30, DWRITE_TEXT_ALIGNMENT_LEADING, DWRITE_PARAGRAPH_ALIGNMENT_CENTER);
    }
}

function on_size() {
    ww = window.Width;
    wh = window.Height;

}

function on_playback_dynamic_info_track(type) {
    if (type == 1)
        update_album_art();
}

function on_playback_new_track() {
    update_album_art();
}

function on_playback_stop(reason) {
    get_selection();
    update_album_art();
}

function covit_search() {
    counter++;
    var primary_image = covit_images + '\\p' + counter;
    var secondary_image = covit_images + '\\s' + counter;
    var pbrowser = '';
    if (browser > 0)
        pbrowser = '--browsers ' + browsers[browser];
    var pcountry = '';
    if (country > 0)
        pcountry = '--query-country ' + countries[country];
    var presolution = '';
    if (resolution > 0)
        presolution = '--query-resolution ' + resolutions[resolution];
    var psources = '';
    if (sources_use) {
        psources = '--query-sources ';
        psources += psourcesarr.toString();
    }

    var parameters = '--catch --address ' + covit_address + ' ' + pbrowser + ' --query-artist \"' + artist + '\" --query-album \"' + album + '\"  --primary-output \"' + primary_image + '\"  --primary-overwrite --secondary-output \"' + secondary_image + '\" ' + pcountry + ' ' + presolution + ' ' + psources + ' --remote-agent "foobar2000 JScript Panel 3 - JSCovit" --remote-text \"foobar2000 JScript Panel 3 - JSCovit\"';

    if (debug)
        console.log("Parameters: " + parameters);

    id = utils.RunCmdAsync(window.ID, covit_bin, parameters);

    var runobj = {
        "id": id,
        "artist": artist,
        "album": album,
        "counter": counter,
        "primary_image": primary_image,
        "secondary_image": secondary_image,
        "filename": filename,
        "g_handle_list": handle_list
    };

    tasks.push(runobj);
}

function on_run_cmd_async_done(task_id) {
    if (debug)
        console.log("Task ID: " + task_id);

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == task_id) {
            if (debug)
                console.log("Task ID Json: " + JSON.stringify(tasks[i]));

            //primary-output
            var p = utils.Glob(tasks[i].primary_image + ".*").toArray();
            if (p.length) {
                try {
                    var x = utils.Glob(filename + ".*").toArray();
                    for (var n = 0; n < x.length; n++) {
                        fso.DeleteFile(x[n]);
                    }
                    fso.CopyFile(p[0], tasks[i].filename + '.' + p[0].split('.').pop().toLowerCase());

                    if (remove_embedded)
                        tasks[i].g_handle_list.RemoveAttachedImage(0);

                    if (add_embedded)
                        tasks[i].g_handle_list.AttachImage(p[0], 0);

                    fso.DeleteFile(p[0]);
                    window.NotifyOthers("JSCovit", "new artwork");
                } catch (err) {
                    console.log(err);
                }
            }

            //secondary-output
            var s = utils.Glob(tasks[i].secondary_image + ".*").toArray();
            if (s.length) {
                tasks[i].g_handle_list.AttachImage(s[0], 0);
                fso.DeleteFile(s[0]);
                window.NotifyOthers("JSCovit", "new artwork");
            }
        }
    }

    window.SetTimeout(function () {
        update_album_art();
    }, 1000);
}

function get_sources_list() {
    psourcesarr = [];
    if (sources_enabled_0)
        psourcesarr.push(sources[0]);
    if (sources_enabled_1)
        psourcesarr.push(sources[1]);
    if (sources_enabled_2)
        psourcesarr.push(sources[2]);
    if (sources_enabled_3)
        psourcesarr.push(sources[3]);
    if (sources_enabled_4)
        psourcesarr.push(sources[4]);
    if (sources_enabled_5)
        psourcesarr.push(sources[5]);
    if (sources_enabled_6)
        psourcesarr.push(sources[6]);
    if (sources_enabled_7)
        psourcesarr.push(sources[7]);
    if (sources_enabled_8)
        psourcesarr.push(sources[8]);
    if (sources_enabled_9)
        psourcesarr.push(sources[9]);
    if (sources_enabled_10)
        psourcesarr.push(sources[10]);
    if (sources_enabled_11)
        psourcesarr.push(sources[11]);
    if (sources_enabled_12)
        psourcesarr.push(sources[12]);
    if (sources_enabled_13)
        psourcesarr.push(sources[13]);
    if (sources_enabled_14)
        psourcesarr.push(sources[14]);
    if (sources_enabled_15)
        psourcesarr.push(sources[15]);
    if (sources_enabled_16)
        psourcesarr.push(sources[16]);
    if (sources_enabled_17)
        psourcesarr.push(sources[17]);
    if (sources_enabled_18)
        psourcesarr.push(sources[18]);
    if (sources_enabled_19)
        psourcesarr.push(sources[19]);
    if (sources_enabled_20)
        psourcesarr.push(sources[20]);
    if (sources_enabled_21)
        psourcesarr.push(sources[21]);
    if (sources_enabled_22)
        psourcesarr.push(sources[22]);
    if (sources_enabled_23)
        psourcesarr.push(sources[23]);
    if (sources_enabled_24)
        psourcesarr.push(sources[24]);
    if (sources_enabled_25)
        psourcesarr.push(sources[25]);
    if (sources_enabled_26)
        psourcesarr.push(sources[26]);
    if (sources_enabled_27)
        psourcesarr.push(sources[27]);
    if (sources_enabled_28)
        psourcesarr.push(sources[28]);
    if (debug)
        console.log("Selected no of sources: " + psourcesarr.length);
    if (psourcesarr.length > sources_limit)
        utils.ShowPopupMessage("You have selected " + psourcesarr.length + " sources.\nThe limit is " + sources_limit + " sources that are allowed.", "Sources Error");
}

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0)
        return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0)
        return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

function checkArrayEqualElements(_array) {
    if (typeof _array !== 'undefined') {
        var firstElement = _array[0];
        return _array.every(function (element) {
            return element === firstElement;
        });
    }
    return "Array is Undefined";
}