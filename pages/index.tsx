import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import mainImage from '@/assets/images/lionfb_01.jpg'
import { Form, Button, Spinner } from 'react-bootstrap'
import { FormEvent, useState } from 'react'
import Typewriter from '../components/Typewriter';
import TextToSpeech from '../components/TextToSpeech';




export default function Home() {

  const [quote, setQuote] = useState("");
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteLoadingError, setQuoteLoadingError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get("prompt")?.toString().trim();

    if (prompt) {
      try {
        setQuote("");
        setQuoteLoadingError(false);
        setQuoteLoading(true);

        const response = await fetch("/api/et?prompt=" + encodeURIComponent(prompt));
        const body = await response.json();
        setQuote(body.quote);
      } catch (error) {
        console.error(error);
        setQuoteLoadingError(true);
      } finally {
        setQuoteLoading(false);
      }
    }
  }

  return (
    <>
      <Head>
        <title>ChatGPT_AI_開發專案</title>
        <meta name="description" content="by Coding in Flow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <main className={styles.main}>
        <h1>ChatGPT_AI_開發專案🪅️</h1>
        <h2>Created by Scott</h2>
        <div>AI 對話、文本產生平臺</div>
        <div className={styles.mainImageContainer}>
          <Image
            src={mainImage}
            fill
            alt='ET'
            priority
            className={styles.mainImage}
          />
          </div>
        <Form onSubmit={handleSubmit} className={styles.inputForm}>
          <Form.Group className='mb-3' controlId='prompt-input'>
            <Form.Label>您好：我是AI助理，歡迎詢問任何問題❗️😋️</Form.Label>
            <Form.Control
              name='prompt'
              placeholder='請在此輸入您的問題...'
              maxLength={100}
            />
          </Form.Group>
          <Button type='submit' className='mb-3' disabled={quoteLoading}>
            發問
          </Button>
          <div></div>
          <Button href= "/travel_japanese" type='submit' className='mb-3' disabled={quoteLoading}>
            日文旅遊推薦
          </Button>
          <div></div>
          <Button href= "/text2image" type='submit' className='mb-3' disabled={quoteLoading}>
            輸入文字產生圖像
          </Button>
          <div>
      <TextToSpeech text={quote} />
    </div>
        </Form>
        
        {quoteLoading && <Spinner animation='border' />}
        {quoteLoadingError && "Something went wrong. Please try again."}
        <Typewriter text={quote} />
                        
       </main>
              
       
      </>
  )
}




