import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockReadLineAsync = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    return Promise.resolve(inputs[0]);
  });
};

describe("자동차 이름 테스트", () =>{
  test("사용자 입력 받는 함수", async () => {
    const inputs = ["hong,sung,soo"];
    mockReadLineAsync(inputs);
    const app = new App();
    const result = await app.carNameInput();
    expect(result).toContainEqual("hong", "sung", "soo");
  });
  
  test("사용자 입력 예외처리", async () => {
    const inputs = ["Hongsungsoo"];
    mockReadLineAsync(inputs);
    const app = new App();
    await expect(app.carNameInput()).rejects.toThrow("[ERROR]");
  });
});

describe("게임 라운드 수 테스트", () => {
  test("사용자 입력 받는 함수", async () => {
    const inputs = [1];
    MissionUtils.Console.readLineAsync = jest.fn();
    MissionUtils.Console.readLineAsync.mockResolvedValue(Promise.resolve(inputs[0]));
    const app = new App();
    const result = await app.gameNumberInput();
    expect(result).toBe(1);
  });

  test("사용자 입력 예외 처리", async () => {
    const inputs = ["a"];
    MissionUtils.Console.readLineAsync = jest.fn();
    MissionUtils.Console.readLineAsync.mockResolvedValue(Promise.resolve(inputs[0]));
    const app = new App();
    expect(app.gameNumberInput()).rejects.toThrow("[ERROR]");
  });
});

describe("게임 진행 상황 출력 테스트", () => {
  test("전진 상황 출력 테스트", () => {
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ["sung", "soo"];
    const outputs = ["sung : ", "soo : -"];

    MissionUtils.Random.pickNumberInRange = jest.fn();
    MissionUtils.Random.pickNumberInRange.mockReturnValueOnce(STOP);
    MissionUtils.Random.pickNumberInRange.mockReturnValueOnce(MOVING_FORWARD);
    const logSpy = jest.spyOn(MissionUtils.Console, "print");

    const app = new App();
    app.carMoveArray = ["", ""];
    app.carMoveText(inputs);

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test("최종 우승자 선별 테스트", () => {
    const NameArray = ["sung", "soo"];
    const MoveArray = ["-", "--"];
    const outPut = "최종 우승자 : soo";
    const winnerLength = 2;

    const logSpy = jest.spyOn(MissionUtils.Console, "print");
    logSpy.mockClear();

    const app = new App();
    app.carName = NameArray;
    app.carMoveArray = MoveArray;
    app.getWinnerArray(winnerLength);
    app.resultText();
    

    expect(logSpy).toHaveBeenCalledWith(outPut);
  });
});
