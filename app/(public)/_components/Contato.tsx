"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log({ nome, email });
  };

  return (
    <>
      <style>{`
        .contato-section {
          background: #FFC8D6;
          position: relative;
          overflow: hidden;
          padding: 160px 80px;
          font-family: inherit;
          min-height: 560px;
          display: flex;
          align-items: center;
        }

        .contato-inner {
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 100px;
        }

        .contato-left {
          flex: 1 1 340px;
          max-width: 480px;
        }

        .contato-badge {
          display: inline-block;
          background: #38C9C9;
          border-radius: 12px 40px 36px 16px / 20px 16px 28px 38px;
          padding: 18px 36px;
          margin-bottom: 32px;
        }

        .contato-badge h2 {
          margin: 0;
          font-size: 34px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          font-family: inherit;
        }

        .contato-desc {
          margin: 0;
          font-size: 20px;
          line-height: 1.8;
          color: #000;
          font-weight: 600;
        }

        .contato-right {
          flex: 1 1 340px;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contato-input {
          padding: 12px 18px;
          border-radius: 10px;
          border: 1.5px solid rgba(0,0,0,0.1);
          background: #fff;
          font-size: 15px;
          color: #3a2a2a;
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
          width: 100%;
          box-sizing: border-box;
        }

        .contato-input:focus {
          border-color: #38C9C9;
        }

        .contato-btn {
          background: #8B5CF6;
          color: #fff;
          border: none;
          border-radius: 12px;
          margin-top: 10px;
          padding: 15px 35px;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.2s, transform 0.1s;
          align-self: flex-start;
        }

        .contato-btn:hover {
          background: #7c3aed;
          transform: translateY(-2px);
        }

        .contato-btn:active {
          transform: translateY(1px);
        }

        /* Tablet */
        @media (max-width: 900px) {
          .contato-section {
            padding: 100px 48px;
            min-height: 460px;
          }
          .contato-inner {
            gap: 60px;
          }
          .contato-badge h2 {
            font-size: 26px;
          }
          .contato-desc {
            font-size: 17px;
          }
        }

        /* Mobile */
        @media (max-width: 580px) {
          .contato-section {
            padding: 60px 20px;
            min-height: unset;
          }
          .contato-inner {
            flex-direction: column;
            align-items: stretch;
            gap: 30px;
          }
          .contato-left {
            max-width: 100%;
            text-align: center;
          }
          .contato-badge {
            display: block;
            text-align: center;
          }
          .contato-right {
            max-width: 100%;
            width: 100%;
            gap: 12px;
          }
          .contato-input {
            padding: 10px 16px;
            font-size: 14px;
          }
          .contato-btn {
            align-self: stretch;
            padding: 16px;
            margin-top: 8px;
          }
        }
      `}</style>

      <section className={`contato-section ${poppins.className}`} id="contato">
        <div className="contato-inner">
          <div className="contato-left">
            <div className="contato-badge">
              <h2>Tem alguma dúvida?</h2>
            </div>
            <p className="contato-desc">
              Entre em contato com a GAAPO. Nossa equipe está à disposição para
              ajudar e responder suas mensagens.
            </p>
          </div>

          <div className="contato-right">
            <input
              className="contato-input"
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              className="contato-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="contato-btn" onClick={handleSubmit}>
              Contato
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
