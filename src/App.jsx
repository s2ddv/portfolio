import { BrowserRouter } from "react-router-dom"

function App() {


  return (
    <>
      <BrowserRouter>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </BrowserRouter>
    </>
  )
}

export default App
