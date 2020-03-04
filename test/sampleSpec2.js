describe("sessionCheckerSpec", () => {
  const sessionChecker = require("../src/middlewares/sessionChecker");
  const whiteListPathWithUrlOnly = /\/api\/test\/path((\/)?(.*))/;
  const whiteListPathWithObject = {
    method: "GET",
    path: /\/api\/test\/path2((\/)?(.*))/
  };
  let whiteLists;
  beforeEach(() => {
    whiteLists = [whiteListPathWithUrlOnly, whiteListPathWithObject];
  });

  it("returns a function when SessionChecker is invoked", () => {
    const actual = sessionChecker(whiteLists);
    expect(actual).toBeDefined();
    expect(typeof actual).toEqual("function");
  });

  describe("calls the middleware with prepared whitelists", () => {
    let checkSession, request, response, nextObj, user, path, method,
      fnGetRequest, fnGetResponse, nextSpy, whiteListSpy, sendStatusSpy;

    beforeEach(() => {
      checkSession = sessionChecker(whiteLists);
      fnGetRequest = () => ({
        user: user,
        path: path,
        method: method
      });
      fnGetResponse = () => ({
        sendStatus: statusCode => statusCode
      });
      nextObj = {
        next: () => {}
      };
      response = fnGetResponse();
      nextSpy = spyOn(nextObj, "next").and.callThrough();
      whiteListSpy = spyOn(whiteLists, "some").and.callThrough();
      sendStatusSpy = spyOn(response, "sendStatus");
    });

    it("calls next() if request path doesn't start with /api", () => {
      path = "/not/api";
      request = fnGetRequest();
      checkSession(request, response, nextObj.next)
      expect(nextSpy).toHaveBeenCalled();
      expect(whiteListSpy).not.toHaveBeenCalled();
      expect(sendStatusSpy).not.toHaveBeenCalled();
    });

    describe("request path starts with /api", () => {
      describe()

      it("calls next() if request path is whitelisted", () => {
        path = "/api/test/path";
        request = fnGetRequest();
        checkSession(request, response, nextObj.next)
        expect(nextSpy).toHaveBeenCalled();
        expect(whiteListSpy).toHaveBeenCalled();
        expect(sendStatusSpy).not.toHaveBeenCalled();
      });

      it("calls next() if request path is whitelisted", () => {
        path = "/api/test/path";
        request = fnGetRequest();
        checkSession(request, response, nextObj.next)
        expect(nextSpy).toHaveBeenCalled();
        expect(whiteListSpy).toHaveBeenCalled();
        expect(sendStatusSpy).not.toHaveBeenCalled();
      });

      describe("checks session if path is not whitelisted", () => {
        it("calls next if user session is valid", () => {

        });

        it("sends status 401 if user session is invalid", () => {

        });
      });
    });
  });
});
