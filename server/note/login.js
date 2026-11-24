function handleLoadVideo(e) {
    e.preventDefault();

    const id = getVideoId(videoUrl.trim());

    if (!id) {
        setError("Please enter a valid YouTube video URL.");
        return;
    }

    setError("");
    setVideoId(id);
    setViews(0);
    setWatchCount(0);
    setActivePlayer(1);
    setVideoLoaded(true);
    setVideoUrl("");
}

useEffect(() => {
    if (!videoId) return;

    let player;

    function createPlayer() {
        if (!window.YT || !window.YT.Player) return;

        player = new window.YT.Player(playerContainerRef.current, {
            videoId: videoId,

            events: {
                onStateChange: (event) => {

                    if (
                        event.data ===
                        window.YT.PlayerState.ENDED
                    ) {
                        setViews(prev => prev + 1);
                        setWatchCount(prev => prev + 1);

                        setActivePlayer(prev =>
                            prev === 1 ? 2 :
                            prev === 2 ? 3 : 3
                        );
                    }
                }
            }
        });

        playerRef.current = player;
    }

    if (window.YT && window.YT.Player) {
        createPlayer();
    } else {
        window.onYouTubeIframeAPIReady = createPlayer;

        if (!document.getElementById("youtube-api")) {
            const script = document.createElement("script");
            script.id = "youtube-api";
            script.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(script);
        }
    }

    return () => {
        if (player && player.destroy) {
            player.destroy();
        }
    };

}, [videoId]);



<div className="video-sections">

    {[1, 2, 3].map((number) => (

        <div className="video-card" key={number}>

            <div className="video-heading">
                <h2>Video selection {number}</h2>
                <span>Video {number}</span>
            </div>

            <div className="video-player">

                <div
                    ref={
                        number === 1 ? player1Ref :
                        number === 2 ? player2Ref :
                        player3Ref
                    }
                    id={`youtube-player-${number}`}
                />

            </div>

        </div>

    ))}

</div>
















