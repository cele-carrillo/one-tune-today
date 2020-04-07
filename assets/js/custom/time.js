const songs = [
    {time: '2020-03-31T09:00:00.0+00:00', name: 'One way or another'},
    {time: '2020-04-01T09:00:00.0+00:00', name: 'You spin me round'},
    {time: '2020-04-02T09:00:00.0+00:00', name: 'A little less conversation'},
    {time: '2020-04-03T09:00:00.0+00:00', name: 'Express yourself'},
    {time: '2020-04-04T09:00:00.0+00:00', name: 'Life is Life'},
    {time: '2020-04-05T10:00:00.0+00:00', name: 'Jailhouse Rock'},
    {time: '2020-04-06T10:00:00.0+00:00', name: "Shake your booty"},
    {time: '2020-04-07T10:00:00.0+00:00', name: "Livin' la vida loca"},
    {time: '2020-04-08T10:00:00.0+00:00', name: "Thunderstruck / Ghostbusters mashup"},
    {time: '2020-04-09T10:00:00.0+00:00', name: "Danza Kuduro"},
    {time: '2020-04-10T10:00:00.0+00:00', name: "Funky Town"},
];

const currentSongGracePeriod = 10 * 60 * 1000;
const closeEtaCountdown = 60 * 1000;

const mainDivDefaultContent = "<h1 class='heavy'>Ready for <br />today's <span class='pink'>tune?</span></h1>";
const secondaryDivDefaultContent = "Get ready to connect to your body and dance!";

function setNextSongMainDivContent(htmlContent) {
    const div = document.getElementById("next-song-main");
    div.innerHTML = htmlContent;
}

function setNextSongSecondaryDivContent(htmlContent) {
    const div = document.getElementById("next-song-secondary");
    div.innerHTML = htmlContent;
}

function printFarETACountdown(songName, countdown) {
    const hours = Math.floor(countdown / (1000 * 60 * 60));
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000);
    const timeExpression =  hours + "h " + minutes + "m " + seconds + "s";
    setNextSongMainDivContent(mainDivDefaultContent);
    setNextSongSecondaryDivContent(
        "We'll be dancing to <span class='aqua'>" + songName + "</span> in <span class='no-brake'>" + timeExpression + "</span>"
    );
}

function printCloseEtaCountDown(songName, countdown) {
    const seconds = Math.floor(countdown  / 1000);
    setNextSongMainDivContent("<h1 class='heavy'>The party <br />starts in <span class='pink'>" + seconds + "!</span></h1>");
    setNextSongSecondaryDivContent(secondaryDivDefaultContent);
}

function printSongCountdown(songName, countdown) {
    if (countdown < closeEtaCountdown) {
        printCloseEtaCountDown(songName, countdown);
    } else {
        printFarETACountdown(songName, countdown);
    }
}

function printCurrentSong(songName) {
    setNextSongMainDivContent("<h1 class='heavy'>We are dancing to <br /><span class='pink'>" + songName + "!</span></h1>");
    setNextSongSecondaryDivContent("Forget your troubles and dance!");
}

function calculateTimeFrom(utcTime) {
    const start = new Date().getTime();
    const utcStart = new Date(utcTime).getTime();

    setInterval(function () {
        const elapsed = new Date().getTime() - start;
        const utcNow = utcStart + elapsed;

        for (let i = 0; i < songs.length; i++) {
            const song = songs[i];
            const songTime = new Date(song.time).getTime();
            if (utcNow > songTime && utcNow < songTime + currentSongGracePeriod) {
                printCurrentSong(song.name);
                break
            }
            else if (songTime > utcNow) {
                const eta = songTime - utcNow;
                printSongCountdown(song.name, eta);
                break;
            }
        }
    }, 1000);
}

function getRealTime() {
    $.getJSON("https://worldtimeapi.org/api/timezone/Australia/Melbourne", function (data) {
        calculateTimeFrom(data.utc_datetime);
    });
}

getRealTime();