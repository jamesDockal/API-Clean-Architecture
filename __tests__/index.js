
class LoginRouter {
  route (Http) {
    if (!Http || !Http.body) {
      return HttpResponse.ServerError()
    }

    const { email, password } = Http.body

    if (!email) {
      return HttpResponse.BadRequest()
    }
    if (!password) {
      return HttpResponse.BadRequest()
    }
  }
}

class HttpResponse {
  static BadRequest () {
    return { statusCode: 401 }
  }

  static ServerError () {
    return { statusCode: 500 }
  }
}

describe('Login Router', () => {
  it('should return 401 if no email was provided', () => {
    const sut = new LoginRouter()

    const HttpRequest = {
      body: {
        password: '123'
      }
    }
    const HttpResponse = sut.route(HttpRequest)

    expect(HttpResponse.statusCode).toBe(401)
  })
  it('should return 401 if no password was provided', () => {
    const sut = new LoginRouter()

    const HttpRequest = {
      body: {
        email: 'james@gmail.com'
      }
    }
    const HttpResponse = sut.route(HttpRequest)

    expect(HttpResponse.statusCode).toBe(401)
  })
  it('should return 500 if no HttpRequest was provided', () => {
    const sut = new LoginRouter()

    const HttpResponse = sut.route({})

    expect(HttpResponse.statusCode).toBe(500)
  })
})
