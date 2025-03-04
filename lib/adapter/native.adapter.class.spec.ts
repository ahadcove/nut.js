import { Button } from "../button.enum";
import { Key } from "../key.enum";
import { Point } from "../point.class";
import { NativeAdapter } from "./native.adapter.class";
import ClipboardAction from "../provider/native/clipboardy-clipboard.class";
import KeyboardAction from "../provider/native/libnut-keyboard.class";
import MouseAction from "../provider/native/libnut-mouse.class";
import WindowAction from "../provider/native/libnut-window.class";
import providerRegistry from "../provider/provider-registry.class";

jest.mock("../provider/native/clipboardy-clipboard.class");
jest.mock("../provider/native/libnut-mouse.class");
jest.mock("../provider/native/libnut-keyboard.class");
jest.mock("../provider/native/libnut-window.class");

let clipboardMock: ClipboardAction;
let keyboardMock: KeyboardAction;
let mouseMock: MouseAction;
let windowMock: WindowAction;

beforeAll(() => {
  clipboardMock = new ClipboardAction();
  keyboardMock = new KeyboardAction();
  mouseMock = new MouseAction();
  windowMock = new WindowAction();
  providerRegistry.registerClipboardProvider(clipboardMock);
  providerRegistry.registerKeyboardProvider(keyboardMock);
  providerRegistry.registerMouseProvider(mouseMock);
  providerRegistry.registerWindowProvider(windowMock);
});

beforeEach(() => {
  jest.resetAllMocks();
});

describe("NativeAdapter class", () => {
  describe("MouseAction", () => {
    it("should delegate calls to setMouseDelay", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);
      const delay = 5;

      // WHEN
      SUT.setMouseDelay(delay);

      // THEN
      expect(mouseMock.setMouseDelay).toBeCalledTimes(1);
      expect(mouseMock.setMouseDelay).toBeCalledWith(delay);
    });

    it("should delegate calls to setMousePosition", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);
      const newPosition = new Point(10, 10);

      // WHEN
      await SUT.setMousePosition(newPosition);

      // THEN
      expect(mouseMock.setMousePosition).toBeCalledTimes(1);
      expect(mouseMock.setMousePosition).toBeCalledWith(newPosition);
    });

    it("should delegate calls to currentMousePosition", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);

      // WHEN
      await SUT.currentMousePosition();

      // THEN
      expect(mouseMock.currentMousePosition).toBeCalledTimes(1);
    });

    it("should delegate calls to leftClick", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);

      // WHEN
      await SUT.leftClick();

      // THEN
      expect(mouseMock.leftClick).toBeCalledTimes(1);
    });

    it("should delegate calls to rightClick", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);

      // WHEN
      await SUT.rightClick();

      // THEN
      expect(mouseMock.rightClick).toBeCalledTimes(1);
    });

    it("should delegate calls to middleClick", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);

      // WHEN
      await SUT.middleClick();

      // THEN
      expect(mouseMock.middleClick).toBeCalledTimes(1);
    });

    it("should delegate calls to pressButton", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);
      const buttonToPress = Button.LEFT;

      // WHEN
      await SUT.pressButton(buttonToPress);

      // THEN
      expect(mouseMock.pressButton).toBeCalledTimes(1);
      expect(mouseMock.pressButton).toBeCalledWith(buttonToPress);
    });

    it("should delegate calls to releaseButton", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);
      const buttonToRelease = Button.LEFT;

      // WHEN
      await SUT.releaseButton(buttonToRelease);

      // THEN
      expect(mouseMock.releaseButton).toBeCalledTimes(1);
      expect(mouseMock.releaseButton).toBeCalledWith(buttonToRelease);
    });
  });

  describe("KeyboardAction", () => {
    it("should delegate calls to pressKey", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);
      const keyToPress = Key.A;

      // WHEN
      await SUT.pressKey(keyToPress);

      // THEN
      expect(keyboardMock.pressKey).toBeCalledTimes(1);
      expect(keyboardMock.pressKey).toBeCalledWith(keyToPress);
    });

    it("should delegate calls to releaseButton", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);
      const keyToRelease = Key.A;

      // WHEN
      await SUT.releaseKey(keyToRelease);

      // THEN
      expect(keyboardMock.releaseKey).toBeCalledTimes(1);
      expect(keyboardMock.releaseKey).toBeCalledWith(keyToRelease);
    });

    it("should delegate calls to click", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);
      const keyToClick = Key.A;

      // WHEN
      await SUT.click(keyToClick);

      // THEN
      expect(keyboardMock.click).toBeCalledTimes(1);
      expect(keyboardMock.click).toBeCalledWith(keyToClick);
    });

    it("should delegate calls to type", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);
      const stringToType = "testString";

      // WHEN
      await SUT.type(stringToType);

      // THEN
      expect(keyboardMock.type).toBeCalledTimes(1);
      expect(keyboardMock.type).toBeCalledWith(stringToType);
    });
  });

  describe("ClipboardAction", () => {
    it("should delegate calls to copy", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);
      const stringToCopy = "testString";

      // WHEN
      await SUT.copy(stringToCopy);

      // THEN
      expect(clipboardMock.copy).toBeCalledTimes(1);
      expect(clipboardMock.copy).toBeCalledWith(stringToCopy);
    });

    it("should delegate calls to paste", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);

      // WHEN
      await SUT.paste();

      // THEN
      expect(clipboardMock.paste).toBeCalledTimes(1);
    });
  });

  describe("WindowAction", () => {
    it("should delegate calls to getActiveWindow", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);

      // WHEN
      await SUT.getActiveWindow();

      // THEN
      expect(windowMock.getActiveWindow).toBeCalledTimes(1);
    });

    it("should delegate calls to getWindows", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);

      // WHEN
      await SUT.getWindows();

      // THEN
      expect(windowMock.getWindows).toBeCalledTimes(1);
    });

    it("should delegate calls to getWindowTitle", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);
      const windowHandle = 123;

      // WHEN
      await SUT.getWindowTitle(windowHandle);

      // THEN
      expect(windowMock.getWindowTitle).toBeCalledTimes(1);
    });

    it("should delegate calls to getWindowRegion", async () => {
      // GIVEN
      const SUT = new NativeAdapter(providerRegistry);
      const windowHandle = 123;

      // WHEN
      await SUT.getWindowRegion(windowHandle);

      // THEN
      expect(windowMock.getWindowRegion).toBeCalledTimes(1);
    });
  });
});
