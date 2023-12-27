import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";
import styled from "styled-components";
import playimg from "../../images/musicplay.gif";
import pauseimg from "../../images/pause.gif";

// WaveformContainer 스타일 컴포넌트를 정의합니다.
const WaveformContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 5.4rem;
  width: 100%;
  background: transparent;
  // gap: 2rem;
  // border: 1px solid red;
`;

// Wave 스타일 컴포넌트를 정의합니다.
const Wave = styled.div`
  width: 100%;
  height: 3rem;

  position: relative;
`;

// PlayButton 스타일 컴포넌트를 정의합니다.
const PlayButton = styled.button`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  // padding-bottom: 3px;
  background: none;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: scale(1.15);
  }
`;

class Waveform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };
    this.waveform = null;
    this.audioRef = React.createRef();
  }

  componentDidMount() {
    this.initializeWaveSurfer();
    this.loadMusic(this.props.music);
  }

  componentWillUnmount() {
    if (this.waveform) {
      this.waveform.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    // 외부로부터 전달된 음악 파일이 변경되면 새로 로드합니다.
    if (prevProps.music !== this.props.music) {
      this.loadMusic(this.props.music);
    }
  }

  initializeWaveSurfer = () => {
    const options = {
      barWidth: 8,
      barRadius: 3,
      barGap: 2,
      barMinHeight: 1,
      cursorWidth: 1,
      container: this.waveformRef,
      backend: "WebAudio",
      height: 30,
      progressColor: "#61E6CA",
      responsive: true,
      waveColor: "#008BFF",
      cursorColor: "transparent",
    };

    this.waveform = WaveSurfer.create(options);
  };

  // 음원트랙 로드.
  loadMusic = (music) => {
    if (this.waveform) {
      this.waveform.load(music);
    }
  };

  // 재생 및 중지 상태 조절하기.
  handlePlay = () => {
    const { playing } = this.state;
    this.setState({ playing: !playing }, () => {
      if (this.waveform) {
        this.waveform.playPause();
      }
    });
  };

  render() {
    const { music } = this.props;
    const { playing } = this.state;

    return (
      <WaveformContainer>
        {/* 재생/일시정지 버튼을 렌더링하고 클릭 시 handlePlay 함수를 호출!*/}
        <PlayButton playing={this.state.playing} onClick={this.handlePlay}>
          <img
            src={playing ? playimg : pauseimg}
            alt={playing ? "Pause" : "Play"}
          />
        </PlayButton>

        {/* Waveform을 표시할 영역 */}
        <Wave id="waveform" ref={(ref) => (this.waveformRef = ref)} />

        {/* 오디오 트랙을 설정합니다. */}
        <audio ref={this.audioRef} src={music} />
        {/* 재생 시간을 나타내는 부분입니다. */}
      </WaveformContainer>
    );
  }
}

export default Waveform;
